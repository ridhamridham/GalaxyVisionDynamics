import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const adminToken = localStorage.getItem('adminToken');

  // If adminToken is not present, redirect to the admin login page
  if (!adminToken) {
    return <Navigate to="/AdminLogin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;