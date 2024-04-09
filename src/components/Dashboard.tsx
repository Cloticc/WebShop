import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      console.log('You must be logged in to view this page');
    } else {
      // Fetch products and orders
      console.log('Fetching products and orders');
     }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}