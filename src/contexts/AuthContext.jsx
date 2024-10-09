import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null); // Store token
  const [loading, setLoading] = useState(true); // To handle loading state

  const navigate = useNavigate();

  // When the component mounts, check if token is present in cookies
  useEffect(() => {
    const token = Cookies.get('authToken'); // Get the token from cookies
    if (token) {
      setAuthToken(token);
    }
    setLoading(false); // Stop loading once we've checked for the token
  }, []);

  // Login function
  const login = (token) => {
    Cookies.set('authToken', token, { expires: 7, secure: process.env.NODE_ENV === 'production' }); // Store token in cookies
    setAuthToken(token);
    navigate('/'); // Navigate to a protected route after login
  };

  // Logout function
  const logout = () => {
    Cookies.remove('authToken'); // Remove token from cookies
    setAuthToken(null);
    navigate('/'); // Redirect to login page after logging out
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
