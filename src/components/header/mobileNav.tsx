import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { SiteNav, siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

const NavButton = ({ icon, label, link, index }: any) => (
  <Link to={link} key={index}>
    <SheetClose>
      <div
        className={
          "rounded-md hover:bg-muted lg:w-40 lg:justify-start lg:p-4 text-muted-foreground my-1 flex items-center" +
          cn(buttonVariants({ variant: "ghost" }))
        }
        aria-label={label}
        key={index}
      >
        {icon}
        <div className="flex pl-2 text-justify justify-end">{label}</div>
      </div>
    </SheetClose>
  </Link>
);
const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <div className="flex justify-start items-end my-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              {siteConfig.logo}

              <span className="sr-only">{siteConfig.name}</span>
            </Link>
            <Link
              to="/"
              className="text-foreground px-2 font-bold transition-colors hover:text-foreground"
            >
              {siteConfig.name}
            </Link>
          </div>

          {SiteNav.map((i: any) => (
            <NavButton
              icon={i.icon}
              label={i.label}
              link={i.link}
              index={i.id}
              key={i.id}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
