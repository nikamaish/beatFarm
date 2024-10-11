import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext


const Login = () => {
  const { login } = useContext(AuthContext); // Use AuthContext to access login function
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  // Handle Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage(''); // Clear success message on new submission

    try {
      const response = await fetch('http://localhost:8000/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Logged in successfully!');
        login(data.token);
        setFormData({ email: '', password: '' }); // Clear form
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
        <h2 className="text-2xl font-bold text-center text-dark-brown mb-4">User Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded border-2 border-dark-brown focus:outline-none focus:border-electric-blue"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full p-3 rounded border-2 border-dark-brown focus:outline-none focus:border-electric-blue"
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
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-dark-brown">
            Don't have an account?{' '}
            <Link to="/signup" className="text-electric-blue ">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
