import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAccount } from "@/redux/actions/user";
import { useDispatch } from "react-redux";
import { ShopNavLinks, siteConfig } from "@/constants/site";
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
          <div className="flex justify-start items-end my-4">
            <Link
              to="/shop/dashboard"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              {siteConfig.logo}

              <span className="sr-only">{siteConfig.name}</span>
            </Link>
            <Link
              to="/shop/dashboard"
              className="text-foreground px-2 font-bold transition-colors hover:text-foreground"
            >
              {siteConfig.name}
            </Link>
          </div>
          {ShopNavLinks.map((i: any) => (
            <NavButton
              icon={i.icon}
              label={i.label}
              link={i.link}
              index={i.id}
              key={i.id}
            />
          ))}
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
