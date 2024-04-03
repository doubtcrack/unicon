import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserPassword } from "@/redux/actions/user";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch: any = useDispatch();
  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    dispatch(updateUserPassword(oldPassword, newPassword, confirmPassword));
  };
  return (
    <div className="flex justify-center items-center w-full min-h-[90vh] mt-8">
      <form
        className="grid w-full lg:w-[100vh] items-start gap-6"
        onSubmit={passwordChangeHandler}
        aria-required={true}
      >
        <fieldset className="grid gap-6 rounded-lg border p-4 pt-8 md:p-8">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Update Credentials
          </legend>

          <div className="grid gap-1">
            <Label className="text-muted-foreground">Current Password</Label>
            <Input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">New Password</Label>
            <Input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Confirm Password</Label>
            <Input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </fieldset>
        <Button value="Update" type="submit">
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
