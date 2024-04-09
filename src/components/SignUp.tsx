import '../styles/SignUp.css';

import React, { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '../context/useAuth';

export const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { signup } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [emailInUse, setEmailInUse] = useState(false);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;


    if (!captchaValue) {
      setErrorMessage('Please verify that you are not a robot');
      return;
    }

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
      setMessage('Account created successfully');
      setErrorMessage('');

      if (emailRef.current && passwordRef.current && confirmPasswordRef.current) {
        emailRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
      }
    } catch (error) {
      console.error(error);
      if ((error as Error).message === 'Firebase: Error (auth/email-already-in-use).') {
        setErrorMessage('An account with this email already exists. ');
        setEmailInUse(true);
      } else if ((error as Error).message === 'Invalid reCAPTCHA token') {
        setErrorMessage('Failed to verify reCAPTCHA. Please try again.');
      } else {
        setErrorMessage('Failed to create an account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }


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
      <ReCAPTCHA sitekey="6LeZqrUpAAAAAJj3e_gWr0A_JWzroS4yF94kgnIP" onChange={handleCaptchaChange} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {message && <p className="message">{message}</p>}
      {emailInUse && (
        <p>
          <Link to="/forgotpassword">forgot password</Link>
        </p>
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign Up'}
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};