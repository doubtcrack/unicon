import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { SVGIcons } from "../svgIcons";

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
              <SVGIcons.logo />

              <span className="sr-only">UNICON</span>
            </Link>
            <Link
              to="/"
              className="text-foreground px-2 font-bold transition-colors hover:text-foreground"
            >
              UNICON
            </Link>
          </div>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Orders
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Products
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Customers
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Analytics
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
