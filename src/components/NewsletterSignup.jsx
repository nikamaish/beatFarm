import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage('Thank you for subscribing!');
        setEmail(''); 
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
<div className="w-78 bg-light-black p-6 mt-2 mb-52 sm:mb-8 rounded-lg shadow-md">      
  <h2 className="text-2xl font-bold text-center text-white mb-8">Subscribe to our Newsletter</h2>
  
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full  p-3 rounded border-2 border-white focus:outline-none focus:border-electric-blue"
          />
        </div>
  
        {errorMessage && <p className="text-coral mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-sage-green mb-4">{successMessage}</p>}
  
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded bg-electric-blue text-white font-bold hover:bg-blue-600 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
  
};

export default NewsletterSignup;
