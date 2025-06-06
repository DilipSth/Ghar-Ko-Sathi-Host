/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import config from "../config/api";
import axiosInstance from "../config/axios";

// Create a context
const userContext = createContext();

// AuthContext component
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verify user function
  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axiosInstance.get(config.endpoints.auth.verify);

          if (response.data?.success && isMounted) {
            setUser(response.data.user); // Update user state
          } else if (isMounted) {
            setUser(null); // Reset user state if verification fails
          }
        } else if (isMounted) {
          setUser(null); // Reset user state if no token is found
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        if (isMounted) setUser(null); // Reset user state on error
      } finally {
        if (isMounted) setLoading(false); // Ensure loading is set to false
      }
    };

    verifyUser();

    // Cleanup function to prevent state updates on unmounted components
    return () => {
      isMounted = false;
    };
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Check if the user is a service provider and not approved
  const isPendingApproval = () => {
    return user && user.role === "serviceProvider" && user.approved === false;
  };

  return (
    <userContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isPendingApproval,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(userContext);
};

export default AuthContext;