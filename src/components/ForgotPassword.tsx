import '../styles/Login.css';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';

import { AuthContext } from '../context/AuthContext';

export const ForgotPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { resetPassword } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;


    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage('Invalid email');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email);
      // Clear error message
      setErrorMessage('');
      // Navigate to another page after successful rest password
      navigate('/login');
    } catch (error) {
      // Handle login error here
      setErrorMessage('Failed to get new password');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>
        Email:
        <input type="email" ref={emailRef} autoComplete='email' required />
      </label>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get New Password'}
      </button>
      <p>
        <Link to="/login">Login</Link>
      </p>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
};

