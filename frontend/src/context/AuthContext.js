import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (_) {}
    }
    setAuthReady(true);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("jwt", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = (navigateFn) => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    if (navigateFn) navigateFn("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
