import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import { AuthContext } from '../contexts/AuthContext'; // If AuthContext is in 'contexts' folder

const ArtistProfile = () => {
  const [artistData, setArtistData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate();

  // Fetch artist profile data
  useEffect(() => {
    const fetchArtistProfile = async () => {
      try {
        const token = Cookies.get('authToken'); // Retrieve the token using the correct key
        console.log('Retrieved token:', token); // Log the token to check

        if (!token) {
          setErrorMessage('No token found. Please log in.'); // Handle the case where no token exists
          return;
        }

        const response = await fetch('http://localhost:8000/api/artists/getArtist', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Use Bearer token from cookies
          },
        });

        const data = await response.json();

        if (response.ok) {
          setArtistData(data); // Set the artist data if the request is successful
        } else {
          setErrorMessage(data.message || 'Failed to fetch profile'); // Handle errors
        }
      } catch (error) {
        setErrorMessage('Failed to connect to the server'); // Handle fetch errors
      }
    };

    fetchArtistProfile();
  }, []);

  // Handle logout
  const handleLogout = () => {
    Cookies.remove('token'); // Remove the token from cookies using the correct key
    logout(); // Call logout function from AuthContext
    navigate('/artistsignup'); // Redirect to login page after logout
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Artist Profile Button */}
      <button
        onClick={toggleDropdown}
        className="bg-electric-blue text-white px-6 py-2 rounded-full w-full hover:bg-blue-600 transition duration-300"
      >
        {artistData.artistName || 'Loading...'}
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* Display artist information */}
            <p className="block px-4 py-2 text-sm text-gray-700">
              Email: {artistData.email || 'Loading...'}
            </p>
            <p className="block px-4 py-2 text-sm text-gray-700">
              Artist Name: {artistData.artistName || 'Loading...'}
            </p>
            <p className="block px-4 py-2 text-sm text-gray-700">
              Bio: {artistData.bio || 'Loading...'}
            </p>
            {artistData.profilePicture && (
              <img src={artistData.profilePicture} alt="Profile" className="w-full h-auto" />
            )}
            
            {/* Error Message if any */}
            {errorMessage && (
              <p className="block px-4 py-2 text-sm text-red-500">
                {errorMessage}
              </p>
            )}

            {/* Logout Option */}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfile;