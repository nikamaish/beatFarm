import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation (password match)
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Additional validations
    if (!formData.email) {
      setErrorMessage('Email is required');
      return;
    }

    if (!formData.password) {
      setErrorMessage('Password is required');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    // Simulate successful sign up
    setSuccessMessage('Account created successfully!');
    setFormData({ email: '', password: '', confirmPassword: '' }); // Clear form
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto text-center bg-light-brown p-8 rounded-lg my-36 shadow-md">
        <h2 className="text-2xl font-bold text-dark-brown mb-4">Sign Up</h2>

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
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="w-full p-3 rounded border-2 border-dark-brown focus:outline-none focus:border-electric-blue"
            />
          </div>

          {/* Display Error Message */}
          {errorMessage && <p className="text-coral mb-4">{errorMessage}</p>}

          {/* Display Success Message */}
          {successMessage && <p className="text-sage-green mb-4">{successMessage}</p>}

          <button
            type="submit"
            className="w-full p-3 rounded bg-electric-blue text-white font-bold hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-dark-brown">
            Already have an account?{' '}
            <Link to="/login" className="text-electric-blue">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
