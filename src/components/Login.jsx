import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Dummy email and password validation for demo purposes
    if (formData.email === 'user@example.com' && formData.password === 'password123') {
      alert('Logged in successfully!');
      setFormData({ email: '', password: '' }); // Clear form
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-light-brown p-8 rounded-lg my-36 shadow-md">
      <h2 className="text-2xl font-bold text-center text-dark-brown mb-4">Log In</h2>

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
