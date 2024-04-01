import useProductHandlers from "@/hooks/useProductHandler";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

const CartProductCard = ({ data, index }: any) => {
  const {
    incrementHandler,
    decrementHandler,
    removeFromCartHandler,
    totalPrice,
    value,
  }: any = useProductHandlers(data);

  return (
    <div key={index}>
      <Separator className="my-3" />
      <div className="flex items-center justify-between">
        <h4 className="text-left my-2">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        <Button
          size={"icon"}
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex">
          <Link to={`/product/${data._id}`}>
            <img
              src={`${data?.images[0]}`}
              alt=""
              className="w-10 h-10 rounded-sm cursor-pointer"
            />
          </Link>
          <div className="px-3 text-muted-foreground text-sm">
            <h5>
              {data?.discountPrice} * {value} Rs.
            </h5>
            <h5>{totalPrice} Rs.</h5>
          </div>
        </div>

        <div className="flex items-center text-muted-foreground">
          <Button
            className="cursor-pointer h-6 w-6"
            size={"icon"}
            variant={"outline"}
            onClick={() => decrementHandler()}
          >
            <Minus className="h-5 w-5" />
          </Button>
          <span className="p-2 text-muted-foreground">{data?.qty}</span>

          <Button
            className="cursor-pointer h-6 w-6"
            size={"icon"}
            variant={"outline"}
            onClick={() => incrementHandler()}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
