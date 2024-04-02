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

const Aside = () => {
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-[90vh] flex-col border-r">
      <TooltipProvider>
        <nav className="grid gap-1 p-2 lg:my-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground"
                aria-label="Profile"
              >
                <UserRound className="size-5" />
                <div className="hidden lg:block pl-2">Profile</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Profile
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground"
                aria-label="Orders"
              >
                <ShoppingBag className="size-5" />
                <div className="hidden lg:block pl-2">Orders</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Orders
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground"
                aria-label="Inbox"
              >
                <MessageSquare className="size-5" />
                <div className="hidden lg:block pl-2">Inbox</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Inbox
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground"
                aria-label="Track Order"
              >
                <Radar className="size-5" />
                <div className="hidden lg:block pl-2">Track Order</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Track Order
            </TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground"
                aria-label="Settings"
              >
                <Settings2 className="size-5" />
                <div className="hidden lg:block pl-2">Settings</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground"
                aria-label="Logout"
              >
                <LogOut className="size-5" />
                <div className="hidden lg:block pl-2">Logout</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Logout
            </TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default Aside;
