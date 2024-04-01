import { Bookmark, ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import useProductHandlers from "@/hooks/useProductHandler";
import { Link } from "react-router-dom";

const WishlistProductCard = ({ data, index }: any) => {
  const { removeFromWishlistHandler, addToCartHandler }: any =
    useProductHandlers(data);

  return (
    <div key={index}>
      <Separator />
      <div className="flex items-center justify-between">
        <h4 className="text-left my-2">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>

        <Bookmark
          className="h-5 w-5 fill-yellow-300 stroke-yellow-300 cursor-pointer"
          onClick={() => removeFromWishlistHandler()}
        />
      </div>
      <div className="w-full my-2 flex items-center justify-between">
        <Link to={`/product/${data._id}`}>
          <img
            src={`${data?.images[0]}`}
            alt=""
            className="w-10 h-10 rounded-sm cursor-pointer"
          />
        </Link>
        <Button onClick={() => addToCartHandler()} size={"sm"}>
          <ShoppingCart className="h-4 w-4" /> &nbsp; Cart
        </Button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
