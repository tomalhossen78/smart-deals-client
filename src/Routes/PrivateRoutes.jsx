import React, { use } from "react";
import { AuthContext } from "../Context/AuthContest";
import { Navigate } from "react-router";

const PrivateRoutes = ({ chidren }) => {
  const { user } = use(AuthContext);
  if (user) {
    return chidren;
  }
  return <Navigate to={"/register"}></Navigate>;
};

export default PrivateRoutes;
