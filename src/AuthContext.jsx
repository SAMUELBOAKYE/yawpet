import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ On app load, restore auth state from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem("auth");
    const savedUser = localStorage.getItem("currentUser");

    if (authStatus === "true" && savedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Sign up logic
  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
      alert("⚠️ User already exists. Please log in.");
      return false;
    }

    users[email] = { email, password };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ email }));
    localStorage.setItem("auth", "true");

    setIsAuthenticated(true);
    setCurrentUser({ email });

    return true;
  };

  // ✅ Login logic
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[email];

    if (user && user.password === password) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("currentUser", JSON.stringify({ email }));
      setIsAuthenticated(true);
      setCurrentUser({ email });
      return true;
    }

    alert("❌ Invalid email or password.");
    return false;
  };

  // ✅ Logout logic
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook for consuming the context
export function useAuth() {
  return useContext(AuthContext);
}
