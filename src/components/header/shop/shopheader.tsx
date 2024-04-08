import { ModeToggle } from "@/components/mode-toggle";
import ShopMobileNav from "./shopMobileNav";
import ShopNav from "./shopMainNav";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShopNavLinks } from "@/constants/site";
export function ShopHeader() {
  const { seller } = useSelector((state: any) => state.seller);
  const [shopId, setShopId] = useState();
  useEffect(() => {
    if (seller) {
      setShopId(seller._id);
    }
  }, [seller]);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <ShopNav />
      <ShopMobileNav />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
        <div className="hidden ml-auto md:flex text-muted-foreground justify-end">
          {ShopNavLinks.map((i: any) => (
            <Link to={i.link} key={i.id}>
              <Button variant={"ghost"}>{i.icon}</Button>
            </Link>
          ))}
        </div>
        <ModeToggle />
        <Link to={`/shop/preview/${shopId}`}>
          <img
            src={`${seller?.avatar}`}
            alt="seller avatar"
            className="h-8 w-8 rounded-full p-1 border border-border"
          />
        </Link>
      </div>
    </header>
  );
}
