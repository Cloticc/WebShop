import React, { createContext, useEffect, useState } from "react";

import { User } from "firebase/auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  isAuthenticated: boolean;
  currentUser: User | null;
  role: string;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextValue);

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();

  function signup(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    //set role to admin if email is the same as the admin email testing purposes
    const role = email === "isidorssona@gmail.com" ? "admin" : "user";

    setCurrentUser(user);
    setRole(role);
    setIsAuthenticated(true);
  }
  function logout() {
    navigate("/login");
    return auth.signOut();
  }

  function resetPassword(email: string) {
    if (!email) {
      throw new Error("Email is required");
    }
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);

      // Check if user is admin
      const role = user?.email === "isidorssona@gmail.com" ? "admin" : "user";
      setRole(role);

      setLoading(false);
    });

    return unsubscribe;
  }, []);
  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  const value = {
    isAuthenticated,
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    role,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
