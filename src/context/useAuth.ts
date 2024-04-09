import { AuthContext } from '../context/AuthContext';
import React from 'react';

export function useAuth() {
  return React.useContext(AuthContext);
}