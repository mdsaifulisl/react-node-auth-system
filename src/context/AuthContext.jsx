/* eslint-disable react-hooks/set-state-in-effect */
// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Refresh করলে state recover করার জন্য
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const login = async (email, password) => {
    console.log("Login called with:", email, password); // check if called

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      // axios automatically throws error for status >= 400
      // so if this line runs, login is successful
      setIsLoggedIn(true);
      setUserEmail(email);
      localStorage.setItem("userEmail", email);

      return { success: true, message: res.data.message };
    } catch (err) {
      // error from backend or network
      return {
        success: false,
        message: err.response?.data?.message || "Something went wrong",
      };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
