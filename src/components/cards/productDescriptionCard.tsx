import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bookmark,
  BookmarkCheck,
  CircleUser,
  MessageSquare,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import useProductHandlers, {
  useAvgRatingCalc,
} from "@/hooks/useProductHandler";
import useConversationCreator from "@/hooks/useConversationCreator";

export function ProductDescriptionCard({ data }: any) {
  const {
    click,
    removeFromWishlistHandler,
    addToWishlistHandler,
    addToCartHandler,
  } = useProductHandlers(data);
  const { handleMessageSubmit } = useConversationCreator();
  const [averageRating] = useAvgRatingCalc();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base my-2 font-semibold">
          {data?.name}
        </CardTitle>
        <Separator />
        <h2 className="text-sm my-2 font-semibold">Product Description:</h2>
        <Separator className="my-2" />

        <CardDescription>{data?.description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <CardTitle className="flex justify-center items-center">
          <Link to={`/shop/preview/${data?.shop?._id}`}>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full h-8 w-8"
            >
              {data?.shop?.avatar ? (
                <img
                  src={data?.shop?.avatar}
                  alt="shop-avatar"
                  className="h-5 w-5 rounded-full"
                />
              ) : (
                <CircleUser className="h-5 w-5" />
              )}

              <span className="sr-only">Shop Owner</span>
            </Button>{" "}
          </Link>
          &nbsp;{" "}
          <div className="font-normal text-sm">
            {data?.shop?.name} <div></div>
          </div>
        </CardTitle>
        <Button variant="outline">
          <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400" /> &nbsp;
          ({averageRating}/5) Ratings
        </Button>
      </CardFooter>
      <CardFooter className="flex flex-col items-start md:flex-row justify-between">
        <div>
          <span className="text-muted-foreground">Discounted Price : </span>
          {data?.discountPrice} Rs.
        </div>
        <div>
          <span className="text-muted-foreground">Original Price : </span>
          {data?.originalPrice ? data?.originalPrice + " Rs." : null}
        </div>
      </CardFooter>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() =>
            click ? removeFromWishlistHandler() : addToWishlistHandler()
          }
        >
          {click ? (
            <BookmarkCheck className="h-4 w-4 fill-yellow-300 stroke-yellow-300" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}{" "}
          &nbsp;Wishlist
        </Button>
        <Button onClick={() => addToCartHandler()}>
          <ShoppingCart className="h-4 w-4 " /> &nbsp;Cart
        </Button>
      </CardFooter>
      <CardFooter>
        <Button
          className="w-full justify-between"
          onClick={() => handleMessageSubmit()}
        >
          Chat with Owner &nbsp;
          <MessageSquare className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
