import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function UserLogout({ onLogout }) {
  useEffect(() => {
    // Call the onLogout function to handle user logout
    onLogout();
  }, [onLogout]);

  // Redirect the user to the login page after logout
  return <Navigate to="/user-login" />;
}
