import { Button } from "@/components/ui/button";
import {
  CirclePlus,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  PackageSearch,
  Settings2,
  ShoppingBag,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAccount } from "@/redux/actions/user";

const NavButton = ({ icon, label, tooltipLabel }: any) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground my-1"
        aria-label={label}
      >
        {icon}
        <div className="flex pl-2 text-justify">{label}</div>
      </Button>
    </TooltipTrigger>
    <TooltipContent side="right" sideOffset={5}>
      {tooltipLabel || label}
    </TooltipContent>
  </Tooltip>
);

const ShopAside = () => {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  return (
    <aside className="hidden inset-y fixed left-0 z-20 md:flex h-[90vh] flex-col border-r">
      <TooltipProvider>
        <nav className="grid gap-1 p-2 lg:my-4">
          <Link to={"/shop/dashboard"}>
            <NavButton
              icon={<LayoutDashboard className="size-5" />}
              label="Dashboard"
            />
          </Link>
          <Link to="/shop/dashboard/orders">
            <NavButton
              icon={<ShoppingBag className="size-5" />}
              label="All Orders"
            />
          </Link>
          <Link to="/shop/dashboard/products">
            <NavButton
              icon={<PackageSearch className="size-5" />}
              label="All Products"
            />
          </Link>
          <Link to="/shop/dashboard/create-product">
            <NavButton
              icon={<CirclePlus className="size-5" />}
              label="Create Product"
            />
          </Link>
          <Link to="/shop/dashboard/inbox">
            <NavButton
              icon={<MessagesSquare className="size-5" />}
              label="Inbox"
            />
          </Link>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Link to="/shop/dashboard/settings">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground"
              aria-label={"Settings"}
            >
              <Settings2 className="size-5" />
              <div className="hidden lg:block pl-2">Settings</div>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground"
            aria-label={"Logout"}
            onClick={() => dispatch(logoutAccount(navigate, "shop"))}
          >
            <LogOut className="size-5" />
            <div className="hidden lg:block pl-2">Logout</div>
          </Button>
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default ShopAside;
