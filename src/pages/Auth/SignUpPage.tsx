import { SignUpForm } from "@/components/auth/signup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const { isSeller } = useSelector((state: any) => state.seller);

  if (isAuthenticated === true && isSeller === true) {
    navigate("/");
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
