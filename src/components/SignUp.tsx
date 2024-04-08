import '../styles/SignUp.css';

import React, { useRef, useState } from 'react';

import { Link } from 'react-router-dom';

export const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
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

    // Handle signup logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label>
        Email:
        <input type="email" ref={emailRef} required />
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
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};