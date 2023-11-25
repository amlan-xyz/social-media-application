import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getProfileAsync } from "../features/user/userSlice";

export const RequiresAuth = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getProfileAsync());
    }
  }, [token, dispatch]);

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }}></Navigate>
  );
};
