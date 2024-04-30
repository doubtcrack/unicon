import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "../skeleton/loader/loader";
import axios from "axios";
import { server } from "@/server";
import { toast } from "react-toastify";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
const ResetPassForm = ({path, reset_token}:any) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confPass, setConfPass] = useState("");
    const [visible, setVisible] = useState(false);
    const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    try {
        if(password!=confPass){
            setErr("Password Mismatched!");
            return;
        }
      setIsLoading(true);
      const response = await axios.post(`${server}/${path}/reset`,
      {
        reset_token,
        password,
      });
      setIsLoading(false);
      toast.success(response.data.message);
      navigate("/signin");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Card className="w-[70%] md:w-80">
    <CardHeader>
      <CardTitle className="text-2xl">Reset Password</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">New Password</Label>
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
        <div className="grid gap-2">
          <Label htmlFor="password">Confirm Password</Label>
          <div>
              <Input
                id="confPass"
                type="text"
                value={confPass}
                onChange={(e) => setConfPass(e.target.value)}
                required
              />
              <div className="text-red-500">
              {err}</div>
            </div>
        </div>
        {isLoading ? (
          <Button className="w-full !bg-secondary !text-muted-foreground">
           Resetting <Loader />
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full"
            onClick={() => handleSubmit()}
          >
            Reset Password
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
  )
}

export default ResetPassForm
