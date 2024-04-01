import CartProductCard from "@/components/cards/cartProductCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { MoveRight, ShoppingBag } from "lucide-react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const CartSheet = () => {
  const { cart } = useSelector((state: any) => state.cart);
  const totalPrice = cart.reduce((acc: any, item: any) => {
    return acc + item.qty * item.discountPrice;
  }, 0);
  return (
    <Sheet>
      <div
        className={
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        }
      >
        <SheetTrigger>Cart</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left my-4 flex items-center">
              <ShoppingBag className="stroke-purple-900 " /> &nbsp; Your Cart
              <span className="text-muted-foreground">
                &nbsp;({cart && cart.length} items)
              </span>
            </SheetTitle>
            <Separator />
            <ScrollArea className="h-[75vh] w-full">
              {cart &&
                cart.map((data: any, index: any) => (
                  <CartProductCard key={index} data={data} />
                ))}
            </ScrollArea>
          </SheetHeader>
          <SheetFooter className=" sticky top-full">
            <SheetClose asChild>
              <Link to="/checkout" className="w-full">
                <Button className="w-full justify-between">
                  Checkout Now ({totalPrice} Rs.) <MoveRight />
                </Button>
              </Link>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default CartSheet;
