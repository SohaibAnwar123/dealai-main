import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isLoggedIn }) => {
  
  return isLoggedIn === "1" ? element : <Navigate to="/signup" />;
};

export default PrivateRoute;