import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const RequiresAuth = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }}></Navigate>
  );
};
