  import React, { createContext, useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';

  // Create AuthContext
  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null); // Store token
    const [loading, setLoading] = useState(true); // To handle loading state

    const navigate = useNavigate();

    // When the component mounts, check if token is present in localStorage
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
      }
      setLoading(false); // Stop loading once we've checked for the token
    }, []);

    // Login function (stub, replace with real API call)
    const login = (token) => {
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      navigate('/'); // Navigate to a protected route after login
    };

    // Logout function
    const logout = () => {
      localStorage.removeItem('authToken');
      setAuthToken(null);
      navigate('/'); // Redirect to login page after logging out
    };

    return (
      <AuthContext.Provider value={{ authToken, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
