import GenericTable from "@/components/profile/genericTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllOrdersOfUser } from "@/redux/actions/order";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OrderDetailsPage = () => {
  const { orders } = useSelector((state: any) => state.order);
  const { user } = useSelector((state: any) => state.user);
  const dispatch: any = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  let totalPrice = 0;

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, []);

  const data = orders && orders.find((item: any) => item?._id === id);
  const items: any = [];
  data &&
    data?.cart.map((item: any, index: any) => {
      totalPrice = totalPrice + item.discountPrice;
      items.push({
        img: item.images[0],
        title: item.name,
        amount: item.discountPrice,
        Qty: item.qty,
        totalAmount: item.discountPrice * item.qty + " Rs.",
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
  ];
  return (
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
      <GenericTable data={items} columns={columns} />
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
  );
};

export default OrderDetailsPage;
