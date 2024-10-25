import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null); // Store token
  const [role, setRole] = useState(null); // Store role decoded from JWT
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate();

  // Check if token is present in cookies when the component mounts
  useEffect(() => {
    const token = Cookies.get('authToken'); // Get the token from cookies

    if (token) {
      setAuthToken(token);
      try {
        const decoded = jwtDecode(token); // Decode the JWT
        setRole(decoded.role); // Extract and set the role from token
      } catch (error) {
        console.error('Error decoding token', error);
      }
    }

    setLoading(false); // Stop loading once we've checked for the token
  }, []);

  // Login function
  const login = (token) => {
    Cookies.set('authToken', token, { expires: 7, secure: process.env.NODE_ENV === 'production' }); // Store token in cookies
    setAuthToken(token);

    try {
      const decoded = jwtDecode(token); // Decode the JWT
      setRole(decoded.role); // Extract and set the role from token

      // Redirect based on role after login
      if (decoded.role === 'admin') {
        navigate('/'); // Admin dashboard
      } else if (decoded.role === 'artist') {
        navigate('/'); // Artist dashboard
      } else {
        navigate('/'); // Default user route
      }

    } catch (error) {
      console.error('Error decoding token', error);
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove('authToken'); // Remove token from cookies
    setAuthToken(null);
    setRole(null);
    navigate('/'); 
  };

  return (
    <AuthContext.Provider value={{ authToken, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
