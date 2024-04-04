import WishlistProductCard from "@/components/cards/wishlistProductCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Bookmark } from "lucide-react";
import { useSelector } from "react-redux";

const WishlistSheet = () => {
  const { wishlist }: any = useSelector((state: any) => state.wishlist);

  return (
    <Sheet>
      <div
        className={
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        }
      >
        <SheetTrigger>Wishlist</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left my-4 flex items-center">
              <Bookmark className="fill-yellow-300 stroke-yellow-300" /> &nbsp;
              Your Wishlist{" "}
              <span className="text-muted-foreground">
                &nbsp;({wishlist && wishlist.length} items)
              </span>
            </SheetTitle>
            <Separator />
            <ScrollArea className="h-screen w-full">
              {wishlist &&
                wishlist.map((data: any, index: any) => (
                  <WishlistProductCard data={data} index={index} key={index} />
                ))}
            </ScrollArea>
          </SheetHeader>
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default WishlistSheet;
