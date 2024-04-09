import '../styles/SignUp.css';

import React, { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { signup } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
const [message, setMessage] = useState('');
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage('Invalid email');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await signup(email ?? '', password ?? '');
      setMessage('')
      // Clear error message
      setErrorMessage('') 
      setMessage('Account created successfully');
    } catch (error) {
      // Handle signup error here
      setErrorMessage('Failed to create an account');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label>
        Email:
        <input type="email" ref={emailRef} autoComplete='email' required />
      </label>
      <label>
        Password:
        <input type="password" ref={passwordRef} required />
      </label>
      <label>
        Confirm Password:
        <input type="password" ref={confirmPasswordRef} required />
      </label>
      {errorMessage && <p className="error-message">{errorMessage}</p>} 
      {message && <p className="message">{message}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign Up'} 
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};