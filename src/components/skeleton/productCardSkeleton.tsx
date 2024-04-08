import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </>
  );
};

export default ProductCardSkeleton;

const Card = () => {
  return (
    <div className="">
      <div className="p-4">
        <Skeleton className="rounded-md h-[200px]" />
      </div>
      <div className="flex items-center">
        <Skeleton className="h-8 w-8 rounded-full mx-4" />
        <Skeleton className="h-5 w-40 rounded-lg" />
      </div>
      <Skeleton className=" mt-4 mx-4 h-4 w-[80%] rounded-lg" />
      <Skeleton className=" mt-2 mx-4 h-4 w-[70%] rounded-lg" />
    </div>
  );
};
