import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleUser, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";

export function ProductDescriptionCard({ data }: any) {
  const { products } = useSelector((state: any) => state.products);
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
  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base my-2 font-semibold">
          {data?.name}
        </CardTitle>
        <Separator />
        <h2 className="text-sm my-2 font-semibold">Product Description:</h2>
        <Separator className="my-2" />

        <CardDescription>{data?.description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <CardTitle className="flex justify-center items-center">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full h-8 w-8"
            >
              {data?.shop?.avatar ? (
                <img
                  src={data?.shop?.avatar}
                  alt="shop-avatar"
                  className="h-5 w-5 rounded-full"
                />
              ) : (
                <CircleUser className="h-5 w-5" />
              )}

              <span className="sr-only">Shop Owner</span>
            </Button>{" "}
          </Link>
          &nbsp;{" "}
          <div className="font-normal text-sm">
            {data?.shop?.name} <div></div>
          </div>
        </CardTitle>
        <Button variant="outline">
          <Star className="h-5 w-5" /> &nbsp; ({averageRating}/5) Ratings
        </Button>
      </CardFooter>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Star className="h-5 w-5" /> &nbsp;Wishlist
        </Button>
        <Button>
          <Star className="h-5 w-5" /> &nbsp;Cart
        </Button>
      </CardFooter>
      <CardFooter>
        <Button className="w-full justify-between">
          Chat with Owner &nbsp;
          <Star className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
