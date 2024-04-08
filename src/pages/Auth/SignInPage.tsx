import { SignInForm } from "@/components/auth/signin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const { isSeller } = useSelector((state: any) => state.seller);

  if (
    isAuthenticated === true &&
    isSeller === true &&
    sessionStorage.getItem("redirectPath")
  ) {
    navigate("/");
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
