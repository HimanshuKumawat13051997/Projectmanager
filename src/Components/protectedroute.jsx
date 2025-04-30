import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { MainComp } from "../pages/maincomponent";

export const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  return <MainComp />;
};
