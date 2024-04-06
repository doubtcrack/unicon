import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateAvatar, updateShopInfo } from "@/redux/actions/user";
import { ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShopSettingsPage = () => {
  const { seller } = useSelector((state: any) => state.seller);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber]: any = useState();
  const [zipCode, setZipcode]: any = useState();

  const dispatch: any = useDispatch();

  useEffect(() => {
    if (seller) {
      setName(seller.name);
      setDescription(seller.description);
      setAddress(seller.address);
      setPhoneNumber(seller.phoneNumber);
      setZipcode(seller.zipCode);
    }
  }, [seller]);
  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updateAvatar(formData, "user/update-avatar"));
    setAvatar(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateShopInfo(name, address, zipCode, phoneNumber, description));
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
            Shop Settings
          </legend>

          {/* Avatar Section */}
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={avatar ? URL.createObjectURL(avatar) : seller?.avatar}
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
            <Label className="text-muted-foreground">Shop Description</Label>
            <Textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Phone Number</Label>
            <Input
              type="number"
              required
              value={phoneNumber}
              onChange={(e: any) => setPhoneNumber(e.target.value)}
              onKeyDown={(e: any) => {
                if (phoneNumber?.length >= 10 && e.key != "Backspace") {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Address</Label>
            <Input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Zip Code</Label>
            <Input
              type="number"
              required
              value={zipCode}
              onChange={(e: any) => setZipcode(e.target.value)}
              onKeyDown={(e: any) => {
                if (zipCode?.length >= 6 && e.key != "Backspace") {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </fieldset>
        <Button value="Update" type="submit">
          Update Shop Profile
        </Button>
      </form>
    </div>
  );
};

export default ShopSettingsPage;
