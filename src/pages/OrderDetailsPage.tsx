import GenericTable from "@/components/genericTable";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createReview, getAllOrdersOfUser } from "@/redux/actions/order";
import { ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Loader from "@/components/skeleton/loader/loader";

const OrderDetailsPage = () => {
  const { orders, isLoading } = useSelector((state: any) => state.order);
  const { user } = useSelector((state: any) => state.user);
  const dispatch: any = useDispatch();
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  let totalPrice = 0;

  const { id } = useParams();

  const reviewData = {
    user,
    rating,
    comment,
    productId: selectedItem,
    orderId: id,
  };
  useEffect(() => {
    if (user) {
      dispatch(getAllOrdersOfUser(user?._id));
    }
  }, [user]);

  const data = orders && orders.find((item: any) => item?._id === id);
  const items: any = [];
  data &&
    data?.cart.map((item: any) => {
      totalPrice = totalPrice + item.discountPrice * item.qty;
      items.push({
        img: item.images[0],
        title: item.name,
        amount: item.discountPrice,
        Qty: item.qty,
        totalAmount: item.discountPrice * item.qty + " Rs.",
        isReviewed: item?.isReviewed,
        status: data.status,
        id: item._id,
      });
    });
  const columns: any = [
    {
      accessorKey: "img",
      header: "Product",
      enableHiding: false,
      cell: (row: any) => {
        const imgSrc = row.row.original.img;
        return (
          <img src={imgSrc} alt="Product" className="w-10 h-10 rounded-sm" />
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "amount",
      header: "Product Amount",
    },
    {
      accessorKey: "Qty",
      header: "Product Quantity",
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: (row: any) => {
        const { isReviewed, status, id }: any = row.row.original;
        if (!isReviewed && status === "Delivered") {
          return (
            <DialogTrigger onClick={() => setSelectedItem(id)}>
              <div className={cn(buttonVariants())}>Write a Review</div>
            </DialogTrigger>
          );
        }
        return null;
      },
    },
  ];
  const reviewHandler: any = async () => {
    dispatch(createReview(reviewData));
  };
  return (
    <Dialog>
      <div className="my-8">
        <div className="flex items-center my-4">
          <ShoppingBag size={20} color="crimson" />
          <h1 className="text-2xl ml-2">Order Details</h1>
        </div>
        <div className="w-full flex items-center justify-between">
          <h5 className="text-muted-foreground">
            Order ID: <span>#{data?._id}</span>
          </h5>
          <h5 className="text-muted-foreground">
            Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
          </h5>
        </div>
        <GenericTable
          data={items}
          columns={columns}
          tableWidth="w-[90vw] md:w-[80vw]"
        />
        <Separator className="my-8" />
        <div className="text-right">
          Total Price: <strong>{totalPrice}</strong> Rs.
        </div>
        <div className="p-3 m-2">
          <h4 className="text-lg">Payment Info:</h4>
          <h4 className="text-muted-foreground">
            Status: &nbsp;
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Your Feedbacks are valuable to us. Please give your some seconds to
            provide your valuable feedback.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center">
            <Label htmlFor="rating">Ratings: &nbsp;</Label>

            {[1, 2, 3, 4, 5].map((i) =>
              rating >= i ? (
                <Star
                  key={i}
                  className="fill-yellow-400 stroke-yellow-400 cursor-pointer"
                  size={20}
                  onClick={() => setRating(i)}
                />
              ) : (
                <Star
                  key={i}
                  className="cursor-pointer"
                  size={20}
                  onClick={() => setRating(i)}
                />
              )
            )}
          </div>
        </div>
        <div className="grid gap-4">
          <Label htmlFor="comment">Your Review</Label>
          <Textarea
            name="comment"
            id=""
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          {isLoading ? (
            <Button className="!bg-secondary">
              Submitting Review <Loader />
            </Button>
          ) : (
            <Button type="submit" onClick={() => reviewHandler()}>
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsPage;
