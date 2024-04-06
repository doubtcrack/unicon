import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  CirclePlus,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  PackageSearch,
  Settings2,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAccount } from "@/redux/actions/user";
import { useDispatch } from "react-redux";
const NavButton = ({ icon, label, link }: any) => (
  <Link to={link}>
    <SheetClose>
      <div
        className={
          "rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground my-1 flex items-center" +
          cn(buttonVariants({ variant: "ghost" }))
        }
        aria-label={label}
      >
        {icon}
        <div className="flex pl-2 text-justify">{label}</div>
      </div>
    </SheetClose>
  </Link>
);

const ShopMobileNav = () => {
  const navigate: any = useNavigate();
  const dispatch: any = useDispatch();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-1 p-2 lg:my-4">
          <NavButton
            icon={<LayoutDashboard className="size-5" />}
            label="Dashboard"
            link={"/shop/dashboard"}
          />
          <NavButton
            icon={<ShoppingBag className="size-5" />}
            label="All Orders"
            link={"/shop/dashboard/orders"}
          />
          <NavButton
            icon={<PackageSearch className="size-5" />}
            label="All Products"
            link={"/shop/dashboard/products"}
          />
          <NavButton
            icon={<CirclePlus className="size-5" />}
            label="Create Product"
            link={"/shop/dashboard/create-product"}
          />
          <NavButton
            icon={<MessagesSquare className="size-5" />}
            label="Inbox"
            link={"/shop/dashboard/inbox"}
          />
        </nav>
        <nav className="mt-auto grid gap-1 p-2 sticky top-full">
          <NavButton
            icon={<Settings2 className="size-5" />}
            label="Settings"
            link={"/shop/dashboard/settings"}
          />
          <Button
            variant="ghost"
            size="icon"
            className={
              "rounded-md hover:bg-muted w-full !justify-start p-4 text-muted-foreground my-1 flex items-center" +
              cn(buttonVariants({ variant: "ghost" }))
            }
            aria-label={"Logout"}
            onClick={() => dispatch(logoutAccount(navigate, "shop"))}
          >
            <LogOut className="size-5" />
            <div className="flex pl-2 text-justify">Logout</div>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default ShopMobileNav;
