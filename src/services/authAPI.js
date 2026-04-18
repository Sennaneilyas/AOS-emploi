import axios from "axios";

export const IS_AUTH_MOCK = true;

const WP_BASE = import.meta.env.VITE_WP_API_URL;

export const authHttp = axios.create({
    baseURL: WP_BASE,
    timeout: 8000,
});

// Mock data

const MOCK_DELAY = 600;
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const MOCK_USERS = {
    "ilyas@ministere.gov.ma": {
        nom: "Ilyas Sennane",
        email: "ilyas@ministere.gov.ma",
        lieu_travail: "Direction des Systèmes d'Information",
        status: "approved",
        unique_key: "AOS-2026-K7X3-M9QP",
        token: "mock-token-abc123",
    },
    "pending@ministere.gov.ma": {
        nom: "Utilisateur En Attente",
        email: "pending@ministere.gov.ma",
        lieu_travail: "Direction RH",
        status: "pending",
        unique_key: null,
        token: null,
    },
};

// API Calls

/**
 * Register a new adherent.
 * @param {{ nom: string, email: string, telephone: string, lieu_travail: string }} data
 */
export async function registerAdherent(data) {
    if (IS_AUTH_MOCK) {
        await wait(MOCK_DELAY);
        if (data.email === "existing@ministere.gov.ma") {
            const err = new Error("Une demande existe déjà pour cet email.");
            err.status = 409;
            throw err;
        }
        if (!data.email.endsWith("@ministere.gov.ma")) {
            const err = new Error(
                "Cet email n'est pas reconnu dans notre base d'employés."
            );
            err.status = 400;
            throw err;
        }
        return {
            message:
                "Votre demande a été envoyée. Elle sera examinée sous 48h ouvrables.",
        };
    }

    const response = await authHttp.post("/aos/v1/register", data);
    return response.data;
}

/**
 * Sign in with email + unique key.
 * @param {{ email: string, unique_key: string }} credentials
 */
export async function loginAdherent(credentials) {
    if (IS_AUTH_MOCK) {
        await wait(MOCK_DELAY);
        const user = MOCK_USERS[credentials.email];
        if (!user) {
            const err = new Error("Identifiants incorrects.");
            err.status = 401;
            throw err;
        }
        if (user.status === "pending") {
            const err = new Error(
                "Votre compte est en attente de validation par l'administration."
            );
            err.status = 403;
            throw err;
        }
        if (user.unique_key !== credentials.unique_key) {
            const err = new Error("Identifiants incorrects.");
            err.status = 401;
            throw err;
        }
        return { token: user.token, user };
    }

    const response = await authHttp.post("/aos/v1/login", credentials);
    return response.data;
}

/**
 * Verify an existing token (called on app mount).
 * @param {string} token
 */
export async function verifyToken(token) {
    if (IS_AUTH_MOCK) {
        await wait(300);
        const user = Object.values(MOCK_USERS).find((u) => u.token === token);
        if (!user) throw new Error("Token invalide.");
        return user;
    }

    const response = await authHttp.get("/aos/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

/**
 * Logout — invalidate token server-side.
 * @param {string} token
 */
export async function logoutAdherent(token) {
    if (IS_AUTH_MOCK) {
        await wait(300);
        return { message: "Déconnecté." };
    }

    const response = await authHttp.post(
        "/aos/v1/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
}