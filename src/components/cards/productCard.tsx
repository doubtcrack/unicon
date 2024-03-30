import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { addTocart } from "@/redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "@/redux/actions/wishlist";
import { Star, ShoppingCart, CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function ProductCard({ data }: any) {
  const { toast } = useToast();
  const { wishlist } = useSelector((state: any) => state.wishlist);
  const { cart } = useSelector((state: any) => state.cart);
  const [click, setClick] = useState(false);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i: any) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  // const removeFromWishlistHandler = (data) => {
  //   setClick(!click);
  //   dispatch(removeFromWishlist(data));
  // };

  const addToWishlistHandler = (data: any) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id: any) => {
    const isItemExists = cart && cart.find((i: any) => i._id === id);
    if (isItemExists) {
      toast({
        variant: "destructive",
        title: "Item already in cart!",
      });
    } else {
      if (data.stock < 1) {
        toast({
          variant: "destructive",
          title: "Product stock limited!",
        });
      } else {
        const cartData: any = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast({
          variant: "destructive",
          title: "Item added to cart successfully!",
        });
      }
    }
  };
  return (
    <Card className="">
      <div className="p-4">
        <Link to={`/product/${data._id}`}>
          <img
            src={`${data.images && data.images[0]}`}
            alt="product image"
            height={"200px"}
            width={"100%"}
            className="rounded-md"
          />
        </Link>
      </div>
      <CardContent>
        <CardTitle className="flex items-center">
          {/* <Link to={`/shop/preview/${data?.shop._id}`}> */}
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full h-8 w-8"
          >
            {data.shop.avatar ? (
              <img
                src={data.shop.avatar}
                alt="shop-avatar"
                className="h-5 w-5"
              />
            ) : (
              <CircleUser className="h-5 w-5" />
            )}

            <span className="sr-only">Shop Owner</span>
          </Button>{" "}
          {/* </Link> */}
          &nbsp; {data.shop.name}
        </CardTitle>
      </CardContent>
      <CardContent>
        <CardTitle>
          <Link to={`/product/${data._id}`}>
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => addToWishlistHandler(data)}>
          <Star className="h-4 w-4" /> &nbsp;Wishlist
        </Button>
        <Button onClick={() => addToCartHandler(data._id)}>
          <ShoppingCart className="h-4 w-4" /> &nbsp; Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
