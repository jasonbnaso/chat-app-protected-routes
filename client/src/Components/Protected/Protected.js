import { Navigate } from "react-router-dom";
import { useAuthState } from "../Context/AuthProvider";

export const Protected = ({ children }) => {
  const { userInfo } = useAuthState();

  if (userInfo && userInfo.token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
