import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import useProductHandlers from "@/hooks/useProductHandler";
import { Star, ShoppingCart, CircleUser } from "lucide-react";
import { Link } from "react-router-dom";

export function ProductCard({ data }: any) {
  const {
    click,
    removeFromWishlistHandler,
    addToWishlistHandler,
    addToCartHandler,
  } = useProductHandlers(data);

  return (
    <Card className="">
      <div className="p-4">
        <Link to={`/product/${data._id}`}>
          <img
            src={`${data.images && data.images[0]}`}
            alt="product image"
            height={"100px"}
            width={"100%"}
            className="rounded-md h-[200px]"
          />
        </Link>
      </div>
      <CardContent>
        <CardTitle className="flex items-center">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full h-8 w-8"
            >
              {data.shop.avatar ? (
                <img
                  src={data.shop.avatar}
                  alt="shop-avatar"
                  className="h-5 w-5 rounded-full"
                />
              ) : (
                <CircleUser className="h-5 w-5" />
              )}

              <span className="sr-only">Shop Owner</span>
            </Button>{" "}
          </Link>
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
        <Button
          variant="outline"
          onClick={() =>
            click ? removeFromWishlistHandler() : addToWishlistHandler()
          }
        >
          {click ? (
            <Star className="h-4 w-4 fill-yellow-500" />
          ) : (
            <Star className="h-4 w-4" />
          )}{" "}
          &nbsp;Wishlist
        </Button>
        <Button onClick={() => addToCartHandler()}>
          <ShoppingCart className="h-4 w-4" /> &nbsp; Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
