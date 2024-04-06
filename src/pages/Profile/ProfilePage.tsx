import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAvatar, updateUserInformation } from "@/redux/actions/user";
import { ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const { user, error, successMessage } = useSelector(
    (state: any) => state.user
  );
  const dispatch: any = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updateAvatar(formData, "user/update-avatar"));
    setAvatar(file);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[90vh] mt-8">
      <form
        className="grid w-full lg:w-[100vh] items-start gap-6"
        onSubmit={handleSubmit}
        aria-required={true}
      >
        <fieldset className="grid gap-6 rounded-lg border p-4 pt-8 md:p-8">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Profile Update
          </legend>

          {/* Avatar Section */}
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={avatar ? URL.createObjectURL(avatar) : user?.avatar}
                alt="avatar"
                className="h-16 w-16 rounded-full"
              />
              <div className="rounded-full bg-secondary flex items-center justify-center cursor-pointer absolute bottom-0 right-0 p-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <ImagePlus size={"15"} />
                </label>
              </div>
            </div>
          </div>

          {/* Inputs Section */}
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Full Name</Label>
            <Input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Email</Label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={true}
              className="text-muted-foreground"
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Phone Number</Label>
            <Input
              type="number"
              required
              value={phoneNumber}
              onChange={(e: any) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Password</Label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </fieldset>
        <Button value="Update" type="submit">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
