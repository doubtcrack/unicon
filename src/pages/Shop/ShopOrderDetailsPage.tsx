import GenericTable from "@/components/genericTable";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateOrderStatus } from "@/redux/actions/user";
import { getAllOrdersOfShop } from "@/redux/actions/order";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ShopOrderDetailsPage = () => {
  const { orders } = useSelector((state: any) => state.order);
  const { seller } = useSelector((state: any) => state.seller);
  const dispatch: any = useDispatch();
  const [status, setStatus] = useState("");
  let totalPrice = 0;

  const { id } = useParams();
  const navigate: any = useNavigate();

  useEffect(() => {
    if (seller) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [seller]);

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
  const orderUpdateHandler: any = async () => {
    dispatch(updateOrderStatus(id, status, navigate));
  };
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
      <GenericTable
        data={items}
        columns={columns}
        tableWidth="w-[90vw] md:w-[80vw]"
      />
      <Separator className="my-8" />
      <div className="text-right">
        Total Price: <strong>{totalPrice}</strong> Rs.
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="p-3 m-2">
          <h4 className="text-lg">Contact Info:</h4>
          <p className="text-muted-foreground">
            Email Id: &nbsp;
            {data?.user?.email}
          </p>
          {data?.user?.phoneNumber && (
            <p className="text-muted-foreground">
              Phone Number: &nbsp;
              {data?.user?.phoneNumber}
            </p>
          )}
        </div>
        <div className="p-3 m-2">
          <h4 className="text-lg">Payment Info:</h4>
          <p className="text-muted-foreground">
            Status: &nbsp;
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </p>
        </div>
      </div>
      <Select onValueChange={(e: any) => setStatus(e)}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Update Order Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Processing">Processing</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={orderUpdateHandler} className="my-3">
        Update Order
      </Button>
    </div>
  );
};

export default ShopOrderDetailsPage;
