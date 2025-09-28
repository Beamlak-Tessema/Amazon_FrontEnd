import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useData } from "../../Components/DataProvider/DataProvider";

const ProtectedRoute = ({ children }) => {
  const { state } = useData();
  const location = useLocation();

  if (!state.user) {
    return (
      <Navigate
        to="/auth"
        state={{ message: "You must log in to continue" }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
