import "../styles/ForgotPassword.css";

import { useContext, useRef, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { resetPassword } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;

    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage("Invalid email");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email);
      // Clear message
      setMessage("");
      // Clear error message
      setErrorMessage("");
      // Navigate to another page after successful rest password
      // navigate('/login');
      setMessage("Check your email for further instructions");
    } catch (error) {
      // Handle login error here
      setErrorMessage("Failed to get new password");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="forgot-form">
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        ref={emailRef}
        autoComplete="email"
        required
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {message && <p className="message">{message}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Get New Password"}
      </button>

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
};
