import { ProductCard } from "@/components/cards/productCard";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllProductsShop } from "@/redux/actions/product";
import { server } from "@/server";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ShopPreviewPage = () => {
  const [data, setData]: any = useState({});
  const { products } = useSelector((state: any) => state.products);
  const [, setIsLoading] = useState(false);
  const { shopId } = useParams();
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(shopId));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${shopId}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  const totalReviewsLength =
    products &&
    products.reduce(
      (acc: any, product: any) => acc + product.reviews.length,
      0
    );

  const totalRatings =
    products &&
    products.reduce(
      (acc: any, product: any) =>
        acc +
        product.reviews.reduce(
          (sum: any, review: any) => sum + review.rating,
          0
        ),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <div className="">
      <Card className="flex flex-col my-4 lg:w-[20vw] max-h-screen p-4 lg:fixed z-20 lg:left-0">
        <div>
          <div className="w-full flex item-center justify-center">
            <img
              src={`${data?.avatar}`}
              alt=""
              className="object-cover relative h-28 w-28 cursor-pointer rounded-full border border-border-100 p-2"
            />
          </div>
          <h3 className="text-center py-2 font-bold">{data?.name}</h3>
          <p className="text-muted-foreground flex ">{data.description}</p>
        </div>
        <Separator className="my-5" />
        <div>
          <DetailsList label={"Phone Number"} value={data.phoneNumber} />
          <DetailsList
            label={"Total Products"}
            value={products && products.length}
          />
          <DetailsList label={"Total Ratings"} value={averageRating + "/5"} />
          <DetailsList
            label={"Joined On"}
            value={data?.createdAt?.slice(0, 10)}
          />
        </div>
      </Card>
      <section className="my-4 sticky md:left-[25vw] lg:w-[70vw] grid grid-cols-1 md:grid-cols-2">
        {products &&
          products.map((i: any, index: any) => (
            <div className="m-4" key={index}>
              <ProductCard data={i} index={index} />
            </div>
          ))}
      </section>
    </div>
  );
};

export default ShopPreviewPage;

const DetailsList = ({ label, value }: any) => {
  return (
    <div className="my-2 text-sm">
      {label} :<span className="pl-1 text-muted-foreground">{value}</span>
    </div>
  );
};
