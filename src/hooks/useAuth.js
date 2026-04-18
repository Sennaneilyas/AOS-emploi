// this will be imported instead of useAuthContext.

import { useAuthContext } from "../context/AuthContext";

/**
 * Returns the current auth state and actions.
 *
 * @returns {{
 *   user: object | null,
 *   token: string | null,
 *   checking: boolean,
 *   isAuthenticated: boolean,
 *   login: (user: object, token: string) => void,
 *   logout: () => Promise<void>
 * }}
 */
function useAuth() {
    return useAuthContext();
}

export default useAuth;