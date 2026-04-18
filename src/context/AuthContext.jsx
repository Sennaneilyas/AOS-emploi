import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { verifyToken, logoutAdherent } from "../services/AuthAPI";

const AuthContext = createContext(null);
const TOKEN_KEY = "aos_auth_token";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        () => window.localStorage.getItem(TOKEN_KEY) ?? null
    );
    // verifying token on mount | false = done
    const [checking, setChecking] = useState(true);

    //  verify token on every mount
    useEffect(() => {
        if (!token) {
            setChecking(false);
            return;
        }
        verifyToken(token)
            .then((userData) => setUser(userData))
            .catch(() => {
                // Token expired or invalid → clear silently
                setToken(null);
                window.localStorage.removeItem(TOKEN_KEY);
            })
            .finally(() => setChecking(false));
    }, [token]);

    // Actions
    const login = useCallback((userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        window.localStorage.setItem(TOKEN_KEY, authToken);
    }, []);

    const logout = useCallback(async () => {
        const currentToken = window.localStorage.getItem(TOKEN_KEY);
        setUser(null);
        setToken(null);
        window.localStorage.removeItem(TOKEN_KEY);
        // Fire-and-forget — don't block UI on server response
        if (currentToken) {
            logoutAdherent(currentToken).catch(() => { });
        }
    }, []);

    const value = useMemo(
        () => ({ user, token, checking, login, logout, isAuthenticated: !!user })
        , [user, token, checking, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside <AuthProvider>");
    return ctx;
}