import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount } from "@/redux/actions/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Loader from "../skeleton/loader/loader";

export function SignInForm() {
  return (
    <Tabs
      defaultValue="user"
      className=" w-screen h-screen flex flex-col justify-center items-center"
    >
      <TabsList className="grid w-full max-w-lg grid-cols-2">
        <TabsTrigger value="user">User</TabsTrigger>
        <TabsTrigger value="seller">Seller</TabsTrigger>
      </TabsList>
      <TabsContent value="user" className="w-full max-w-lg">
        <SignInCard path={"user/login-user"} afterpath={"/dashboard"} />
      </TabsContent>
      <TabsContent value="seller" className="w-full max-w-lg">
        <SignInCard path={"shop/login-shop"} afterpath={"/shop/dashboard"} />
      </TabsContent>
    </Tabs>
  );
}

const SignInCard = ({ path, afterpath }: any) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { loading } = useSelector((state: any) => state.user);
  const { isLoading } = useSelector((state: any) => state.seller);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgotPass"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <div>
              <Input
                id="password"
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {visible ? (
                <EyeOpenIcon
                  className="cursor-pointer"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <EyeClosedIcon
                  className="cursor-pointer"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>
          {isLoading || loading ? (
            <Button className="w-full !bg-secondary">
              Logging in <Loader />
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full"
              onClick={() =>
                dispatch(
                  loginAccount(email, password, navigate, path, afterpath)
                )
              }
            >
              Login
            </Button>
          )}
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
