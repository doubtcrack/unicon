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
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-[90vh] flex-col border-r">
      <TooltipProvider>
        <nav className="grid gap-1 p-2 lg:my-4">
          <NavButton icon={<UserRound className="size-5" />} label="Profile" />
          <NavButton icon={<ShoppingBag className="size-5" />} label="Orders" />
          <NavButton
            icon={<MessageSquare className="size-5" />}
            label="Inbox"
          />
          <NavButton icon={<Radar className="size-5" />} label="Track Order" />
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <NavButton icon={<Settings2 className="size-5" />} label="Settings" />
          <NavButton icon={<LogOut className="size-5" />} label="Logout" />
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default Aside;
