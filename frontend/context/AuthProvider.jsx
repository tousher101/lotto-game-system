"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 getMe API
  const getMe = async (token) => {
    const res = await fetch("http://localhost:5000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) throw new Error("Not authenticated");

    return res.json();
  };

  // 🔹 refresh token API
  const refreshToken = async () => {
    const res = await fetch("http://localhost:5000/auth/refresh", {
      method: "POST",
      credentials: "include", // 🍪 cookie send হবে
    });

    if (!res.ok) throw new Error("Refresh failed");

    const data = await res.json();

    sessionStorage.setItem("accessToken", data.accessToken);

    return data.accessToken;
  };

  // 🔥 APP LOAD INIT
  useEffect(() => {
    const initAuth = async () => {
      try {
        let token = sessionStorage.getItem("accessToken");

        // access token না থাকলে refresh করো
        if (!token) {
          token = await refreshToken();
        }

        const me = await getMe(token);

        setUser(me);
      } catch (err) {
        console.log("Auth error:", err.message);
        sessionStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 🔹 logout
  const logout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    sessionStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {loading ? <p>Checking auth...</p> : children}
    </AuthContext.Provider>
  );
};

// 🔹 custom hook
export const useAuth = () => useContext(AuthContext);