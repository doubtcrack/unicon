import { Button } from "@/components/ui/button";
import { LogOut, Settings2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAccount } from "@/redux/actions/user";
import { ShopNavLinks } from "@/constants/site";

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
        <div className="hidden lg:flex pl-2 text-justify">{label}</div>
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
          {ShopNavLinks.map((i: any) => (
            <Link to={i.link} key={i.id}>
              <NavButton icon={i.icon} label={i.label} />
            </Link>
          ))}
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
