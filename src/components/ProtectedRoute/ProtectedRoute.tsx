import { useSelector } from "react-redux";
import { AppRootStateType } from "../../app/store";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn);
  const isInitialized = useSelector((state: AppRootStateType) => state.app.isInitialized);

  if (!isInitialized) return <CircularProgress style={{ marginTop: '30%' }} />;
  if (!isLoggedIn) return <Navigate to="/login" />;
  
  return children;
};