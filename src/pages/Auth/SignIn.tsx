import { SignInForm } from "@/components/auth/signin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: any) => state.user);

  if (isAuthenticated === true) {
    navigate("/");
  }
  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
