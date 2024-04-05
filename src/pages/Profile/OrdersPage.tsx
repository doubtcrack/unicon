import GenericTable from "@/components/profile/genericTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllOrdersOfUser } from "@/redux/actions/order";
import { ArrowUpDown, Eye } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { user } = useSelector((state: any) => state.user);
  const { orders } = useSelector((state: any) => state.order);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [user]);

  const data: any = [];

  orders &&
    orders.forEach((item: any) => {
      data.push({
        id: item._id,
        status: item.status,
        itemsQty: item.cart.length,
        totalAmount: item.totalPrice + " Rs.",
      });
    });

  const columns: any = [
    {
      accessorKey: "id",
      header: "Order ID",
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (row: any) => {
        return (
          <Badge variant={"outline"} className="rounded-full">
            {row.getValue("status") === "Delivered" ? (
              <div className="text-green-600">{row.getValue("status")}</div>
            ) : (
              <div className="text-orange-400">{row.getValue("status")}</div>
            )}
          </Badge>
        );
      },
    },
    {
      accessorKey: "itemsQty",
      header: "Items Quantity",
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: (row: any) => {
        return (
          <Link to={`/user/order/${row.row.original.id}`}>
            <Eye size={"15"} className="text-muted-foreground"></Eye>
          </Link>
        );
      },
    },
  ];
  return <GenericTable data={data} columns={columns} />;
};

export default OrdersPage;
