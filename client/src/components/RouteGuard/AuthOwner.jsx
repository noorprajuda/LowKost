import React from "react";
import { Navigate } from "react-router-dom";

const AuthOwner = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  const isOwner = localStorage.getItem("role");

  if (!isAuthenticated && isOwner !== "Owner")
    return <Navigate to={"/login"} />;

  return children;
};

export default AuthOwner;
