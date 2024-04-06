import { ModeToggle } from "@/components/mode-toggle";
import ShopMobileNav from "./shopMobileNav";
import ShopNav from "./shopMainNav";
import {
  CirclePlus,
  LayoutDashboard,
  MessagesSquare,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export function ShopHeader() {
  const { seller } = useSelector((state: any) => state.seller);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <ShopNav />
      <ShopMobileNav />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
        <div className="hidden ml-auto md:flex text-muted-foreground justify-end">
          <Link to={"/shop/dashboard"}>
            <Button variant={"ghost"}>
              <LayoutDashboard className="h-5 w-5 mx-1" />
            </Button>
          </Link>
          <Link to={"/shop/dashboard/orders"}>
            <Button variant={"ghost"}>
              <ShoppingBag className="h-5 w-5 mx-1" />
            </Button>
          </Link>
          <Link to={"/shop/dashboard/products"}>
            <Button variant={"ghost"}>
              <PackageSearch className="h-5 w-5 mx-1" />
            </Button>
          </Link>
          <Link to={"/shop/dashboard/create-product"}>
            <Button variant={"ghost"}>
              <CirclePlus className="h-5 w-5 mx-1" />
            </Button>
          </Link>
          <Link to={"/shop/dashboard/inbox"}>
            <Button variant={"ghost"}>
              <MessagesSquare className="h-5 w-5 mx-1" />
            </Button>
          </Link>
        </div>
        <ModeToggle />
        <img
          src={`${seller?.avatar}`}
          alt="seller avatar"
          className="h-8 w-8 rounded-full p-1 border border-border"
        />
      </div>
    </header>
  );
}
