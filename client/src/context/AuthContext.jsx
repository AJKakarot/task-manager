import { useCallback, useEffect, useMemo, useState } from "react";
import AuthContext from "./authContext.js";
import {
  clearStoredAuth,
  getStoredAuth,
  setStoredAuth
} from "../services/storage.js";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth);
  const [isAuthReady] = useState(true);

  const saveAuth = (nextAuth) => {
    setAuth(nextAuth);
    setStoredAuth(nextAuth);
  };

  const login = useCallback(({ token, user }) => saveAuth({ token, user }), []);

  const logout = useCallback(() => {
    setAuth({ token: null, user: null });
    clearStoredAuth();
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [logout]);

  const value = useMemo(
    () => ({
      token: auth.token,
      user: auth.user,
      isAuthenticated: Boolean(auth.token),
      isAuthReady,
      login,
      logout
    }),
    [auth.token, auth.user, isAuthReady, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
