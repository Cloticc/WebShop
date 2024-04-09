import '../styles/Login.css';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';

import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage('Invalid email');
      return;
    }

    setIsLoading(true);
    try {
      await login(email ?? '', password ?? '');
      // Clear error message
      setErrorMessage('');
      // Navigate to another page after successful login
      navigate('/dashboard');
    } catch (error) {
      // Handle login error here
      setErrorMessage('Failed to log in');
    }
    setIsLoading(false);
  };



  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>
        Email:
        <input type="email" ref={emailRef} autoComplete='email' required />
      </label>
      <label>
        Password:
        <input type="password" ref={passwordRef} autoComplete='current-password' required />
      </label>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      <p>
        <Link to="/forgot-password">Forgot password?</Link>
      </p>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
};