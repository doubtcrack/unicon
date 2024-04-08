import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const SellerProtectedRoute = ({ children }: any) => {
  const { isLoading, isSeller } = useSelector((state: any) => state.seller);
  const location = useLocation();
  if (isLoading === false) {
    if (!isSeller) {
      sessionStorage.setItem("redirectPath", location.pathname);
      return <Navigate to={`/signin`} replace />;
    }
    return children;
  }
};

export default SellerProtectedRoute;
