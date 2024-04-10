import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Loader from "../skeleton/loader/loader";
import axios from "axios";
import { server } from "@/server";
import { toast } from "react-toastify";

const ForgetPassForm = () => {
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
        <ForgetPassCard path={"user/forgot-password"} />
      </TabsContent>
      <TabsContent value="seller" className="w-full max-w-lg">
        <ForgetPassCard path={"shop/forgot-password"} />
      </TabsContent>
    </Tabs>
  );
};

const ForgetPassCard = ({ path }: any) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (path: any) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${server}/${path}`, { email });
      setIsLoading(false);
      toast.success(response.data.message);
      navigate("/signin");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
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
          {isLoading ? (
            <Button className="w-full !bg-secondary !text-muted-foreground">
              Sending reset link <Loader />
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full"
              onClick={() => handleSubmit(path)}
            >
              Reset Password
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgetPassForm;
