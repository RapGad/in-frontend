import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user  = useSelector((state) => state.auth);


  return user.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
