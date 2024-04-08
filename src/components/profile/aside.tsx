import { Button } from "../ui/button";
import {
  LogOut,
  MessageSquare,
  Radar,
  Settings2,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAccount } from "@/redux/actions/user";

const NavButton = ({ icon, label, tooltipLabel }: any) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground"
        aria-label={label}
      >
        {icon}
        <div className="hidden lg:block pl-2">{label}</div>
      </Button>
    </TooltipTrigger>
    <TooltipContent side="right" sideOffset={5}>
      {tooltipLabel || label}
    </TooltipContent>
  </Tooltip>
);

const Aside = () => {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-[90vh] flex-col border-r">
      <TooltipProvider>
        <nav className="grid gap-1 p-2 lg:my-4">
          <Link to={"/dashboard"}>
            <NavButton
              icon={<UserRound className="size-5" />}
              label="Profile"
            />
          </Link>
          <Link to="/dashboard/orders">
            <NavButton
              icon={<ShoppingBag className="size-5" />}
              label="Orders"
            />
          </Link>
          <Link to="/dashboard/inbox">
            <NavButton
              icon={<MessageSquare className="size-5" />}
              label="Inbox"
            />
          </Link>
          <Link to="/dashboard/ordertrack">
            <NavButton
              icon={<Radar className="size-5" />}
              label="Track Order"
            />
          </Link>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Link to="/dashboard/settings">
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
            onClick={() => dispatch(logoutAccount(navigate, "user"))}
          >
            <LogOut className="size-5" />
            <div className="hidden lg:block pl-2">Logout</div>
          </Button>
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default Aside;
