import GenericTable from "@/components/genericTable";
import { Button } from "@/components/ui/button";
import { deleteProduct, getAllProductsShop } from "@/redux/actions/product";
import { ArrowUpDown, Eye, Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShopAllProductsPage = () => {
  const dispatch: any = useDispatch();
  const { products, isLoading } = useSelector((state: any) => state.products);
  const { seller } = useSelector((state: any) => state.seller);

  useEffect(() => {
    dispatch(getAllProductsShop(seller?._id));
  }, [seller]);

  const handleDelete = (id: any) => {
    const sellerId = seller?._id;
    dispatch(deleteProduct(id, sellerId));
  };

  const data: any = [];

  products &&
    products.forEach((item: any) => {
      data.push({
        id: item?._id,
        name: item?.name,
        price: item.discountPrice + " Rs.",
        stock: item.stock,
        sold: item?.sold_out,
      });
    });

  const columns: any = [
    {
      accessorKey: "id",
      header: "Product ID",
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "price",
      header: "Product Price",
    },
    {
      accessorKey: "stock",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (row: any) => {
        return row.getValue("stock") > 3 ? (
          <div className="text-green-600 px-4">{row.getValue("stock")}</div>
        ) : (
          <div className="text-red-500 px-4">{row.getValue("stock")}</div>
        );
      },
    },
    {
      accessorKey: "sold",
      header: "Sold Quantity",
    },
    {
      id: "preview",
      header: "Live Link",
      enableHiding: false,
      cell: (row: any) => {
        return (
          <Link to={`/product/${row.row.original.id}`}>
            <Eye size={"15"} className="text-muted-foreground"></Eye>
          </Link>
        );
      },
    },
    {
      id: "delete",
      cell: (row: any) => {
        return (
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => handleDelete(row.row.original.id)}
          >
            <Trash size={"15"} className="text-muted-foreground" />
          </Button>
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

export default ShopAllProductsPage;
