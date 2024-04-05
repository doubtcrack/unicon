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
import { createAccount } from "@/redux/actions/user";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { CircleUser } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function SignUpForm() {
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
        <SignUpCard path={"user/create-user"} afterpath={"/"} />
      </TabsContent>
      <TabsContent value="seller" className="w-full max-w-lg">
        <SignUpCard path={"shop/create-shop"} afterpath={"/admin/dashboard"} />
      </TabsContent>
    </Tabs>
  );
}

const SignUpCard = ({ path, afterpath }: any) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const handleCreateAccount = () => {
    dispatch(
      createAccount(
        {
          name: name,
          email: email,
          password: password,
          avatar: avatar,
        },
        navigate,
        path,
        afterpath
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Your name</Label>
            <Input
              type="text"
              name="text"
              autoComplete="name"
              placeholder="aman"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              placeholder="aman@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type={visible ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between">
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
              <div className="flex items-center text-sm">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <CircleUser size={"20"} />
                )}
                <Label htmlFor="file-input">
                  <span className="text-xs"> &nbsp;Upload a file</span>
                  <Input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only left-0"
                  />
                </Label>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={() => handleCreateAccount()}
          >
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
