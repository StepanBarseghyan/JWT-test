import React, { ReactNode } from "react";
import { isAuth } from "../../helpers/isAuth";
import { Navigate } from "react-router-dom";
import Login from "../../pages/Login";

interface PrivateRouteProps {
  children: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = isAuth();

  return isAuthenticated ? children : <Navigate to={"/auth/login"} />;
};

export default PrivateRoute;
