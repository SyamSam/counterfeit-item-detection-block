import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  useEffect(() => {
    document.title = "Logged out";
    // Call the onLogout function passed from App.js to handle the log-out logic
    onLogout();
  }, [onLogout]);

  // Use the Navigate component to redirect to the login page after logging out
  return <Navigate to="/admin-login" />;
};

export default Logout;
