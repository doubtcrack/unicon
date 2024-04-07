import GenericTable from "@/components/genericTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllOrdersOfShop } from "@/redux/actions/order";
import { getAllProductsShop } from "@/redux/actions/product";
import { ArrowUpDown, Eye } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShopAllOrdersPage = () => {
  const dispatch: any = useDispatch();
  const { orders } = useSelector((state: any) => state.order);
  const { seller } = useSelector((state: any) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
    dispatch(getAllProductsShop(seller?._id));
  }, [seller]);

  const data: any = [];

  orders &&
    orders.forEach((item: any) => {
      data.push({
        id: item?._id,
        status: item.status,
        itemsQty: item.cart.reduce((acc: any, item: any) => acc + item.qty, 0),
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
          <Link to={`/shop/dashboard/order/${row.row.original.id}`}>
            <Eye size={"15"} className="text-muted-foreground"></Eye>
          </Link>
        );
      },
    },
  ];
  return (
    <div>
      <GenericTable
        data={data}
        columns={columns}
        tableWidth="sm:w-full md:w-[80vw]"
      />
    </div>
  );
};

export default ShopAllOrdersPage;
