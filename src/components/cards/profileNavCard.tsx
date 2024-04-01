import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/redux/actions/user";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import WishlistSheet from "../header/sheets/wishlistSheet";
import { CircleUser } from "lucide-react";
import CartSheet from "../header/sheets/cartSheet";

const ProfileNavCard = () => {
  const dispatch: any = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.user);

  return (
    <>
      {isAuthenticated ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <WishlistSheet />
              <CartSheet />
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => dispatch(logoutUser())}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Link to={"/signin"}>
          <Button variant="outline">
            Login
            <span className="sr-only">Login</span>
          </Button>
        </Link>
      )}
    </>
  );
};

export default ProfileNavCard;
