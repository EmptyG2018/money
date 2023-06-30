import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/user";
import NoAuth from "./403";

const Component = ({ element }) => {
  const location = useLocation();
  const authed = useAuth();
  const whiteList = ["/login", "/register"];
  if (whiteList.includes(location.pathname)) {
    return authed ? <Navigate to="/" replace /> : element;
  }
  return authed ? element : <NoAuth />;
};

export default Component;
