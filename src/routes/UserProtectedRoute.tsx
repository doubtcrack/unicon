import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const UserProtectedRoute = ({ children }: any) => {
  const { loading, isAuthenticated } = useSelector((state: any) => state.user);
  const location = useLocation();
  if (loading === false) {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectPath", location.pathname);
      return <Navigate to="/signin" replace />;
    }
    return children;
  }
};

export default UserProtectedRoute;
