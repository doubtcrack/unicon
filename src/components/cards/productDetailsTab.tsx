import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useProductFilter from "@/hooks/useProductFilter";
import { Link, useParams } from "react-router-dom";
import Ratings from "../ratings";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "@/redux/actions/product";
import { useEffect } from "react";
import { useAvgRatingCalc } from "@/hooks/useProductHandler";

export function ProductDetailsTab() {
  const { id } = useParams();
  let data: any = useProductFilter();
  data = data?.find((i: any) => i?._id === id);

  const dispatch: any = useDispatch();
  const { products } = useSelector((state: any) => state.products);

  const [averageRating, totalReviewsLength] = useAvgRatingCalc();
  useEffect(() => {
    if (data) {
      dispatch(getAllProductsShop(data && data?.shop._id));
    }
  }, [data]);
  return (
    <Tabs defaultValue="review" className="flex justify-center">
      <div className="md:w-3/4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="review">Product Review</TabsTrigger>
          <TabsTrigger value="sellerInfo">Seller Information</TabsTrigger>
        </TabsList>

        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data &&
                data?.reviews?.map((item: any, index: any) => (
                  <div className="w-full flex my-4" key={index}>
                    <img
                      src={`/${item?.user?.avatar}`}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="pl-4 ">
                      <div className="w-full flex items-center">
                        <h1 className="font-[500] mr-3">{item.user.name}</h1>
                        <Ratings rating={data?.ratings} />
                      </div>
                      <p className="text-muted-foreground">{item.comment}</p>
                    </div>
                  </div>
                ))}
              <div className="w-full flex justify-center items-center">
                {data && data.reviews.length === 0 && (
                  <h5 className="text-muted-foreground">
                    No Reviews found for this product!
                  </h5>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sellerInfo">
          <Card>
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 flex justify-between flex-col md:flex-row">
              <div>
                <Link to={`/shop/preview/${data?.shop?._id}`}>
                  <div className="flex items-center">
                    <img
                      src={`${data?.shop?.avatar}`}
                      className="w-10 h-10 rounded-full"
                      alt="shop avatar"
                    />
                    <div className="pl-3">
                      <h3 className="">{data?.shop?.name}</h3>
                      <Ratings rating={averageRating} />
                    </div>
                  </div>
                </Link>
                <p className="pt-2 text-muted-foreground">
                  {data?.shop?.description}
                </p>
              </div>
              <div>
                <div className="my-2">
                  Joined on:
                  <span className="text-muted-foreground">
                    {data?.shop?.createdAt?.slice(0, 10)}
                  </span>
                </div>
                <div className="my-2">
                  Total Products:
                  <span className="text-muted-foreground">
                    {products && products?.length}
                  </span>
                </div>
                <div className="my-2">
                  Total Reviews:{" "}
                  <span className="text-muted-foreground">
                    {totalReviewsLength}
                  </span>
                </div>
                <Link to={`/shop/preview/${data?.shop?._id}`}>
                  <Button>Visit Shop</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
}
