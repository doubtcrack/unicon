import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Package2 } from "lucide-react";
import { Link } from "react-router-dom";

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
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link to="/" className="hover:text-foreground">
            Dashboard
          </Link>
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
