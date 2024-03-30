import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { loading, isAuthenticated } = useSelector((state: any) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;
