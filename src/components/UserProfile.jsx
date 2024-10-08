import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch user profile data (email only) from the server
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token
          },
        });

        const data = await response.json();

        if (response.ok) {
          setEmail(data.email); // Assuming the backend returns user email
        } else {
          setErrorMessage(data.message || 'Failed to fetch profile');
        }
      } catch (error) {
        setErrorMessage('Failed to connect to the server');
      }
    };

    fetchProfile();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token from localStorage
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto text-center bg-light-brown p-8 rounded-lg my-36 shadow-md">
        <h2 className="text-2xl font-bold text-dark-brown mb-4">User Profile</h2>

        {/* Display email */}
        <p className="text-lg mb-4 text-dark-brown">Email: {email || 'Loading...'}</p>

        {/* Display Error Message */}
        {errorMessage && <p className="text-coral mb-4">{errorMessage}</p>}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full p-3 rounded bg-electric-blue text-white font-bold hover:bg-blue-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
