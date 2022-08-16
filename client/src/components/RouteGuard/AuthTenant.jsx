import React from "react";
import { Navigate } from "react-router-dom";

const AuthTenant = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  const isOwner = localStorage.getItem("role");

  if (!isAuthenticated && isOwner !== "Tenant")
    return <Navigate to={"/login"} />;

  return children;
};

export default AuthTenant;
