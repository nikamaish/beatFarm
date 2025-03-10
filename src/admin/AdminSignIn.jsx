import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Use AuthContext for admin authentication
import { useNavigate } from 'react-router-dom'; // Use navigate for redirecting after login

const AdminLogin = () => {
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const navigate = useNavigate(); // Use navigate to redirect after successful login

  // Handle Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage(''); // Clear messages on new submission

    try {
      const response = await fetch('http://localhost:8000/api/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Admin logged in successfully!');
        setFormData({ email: '', password: '' }); // Clear form
        login(data.token); // Call login function and store token in context

        // Redirect to admin dashboard after successful login
        navigate('/');
      } else {
        setErrorMessage(data.message || 'Invalid email or password');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-light-brown p-8 rounded-lg my-36 shadow-md">
        <h2 className="text-2xl font-bold text-center text-dark-brown mb-4">Admin Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter admin email"
              className="w-full p-3 rounded border-2 border-dark-brown focus:outline-none focus:border-electric-blue"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter admin password"
              className="w-full p-3 rounded border-2 border-dark-brown focus:outline-none focus:border-electric-blue"
              required
            />
          </div>

          {/* Display Error Message */}
          {errorMessage && <p className="text-coral mb-4">{errorMessage}</p>}

          {/* Display Success Message */}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

          <button
            type="submit"
            className="w-full p-3 rounded bg-electric-blue text-white font-bold hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
