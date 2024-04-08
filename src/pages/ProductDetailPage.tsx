import { ProductDescriptionCard } from "@/components/cards/productDescriptionCard";
import useProductFilter from "@/hooks/useProductFilter";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsTab } from "./../components/cards/productDetailsTab";
import SuggestedProducts from "@/components/cards/suggestedProducts";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailPage = () => {
  let data: any;
  const [select, setSelect] = useState(0);
  const { id } = useParams();
  const { filteredProducts, isLoading } = useProductFilter();
  if (!isLoading) {
    data = filteredProducts?.find((i: any) => i._id === id);
  }
  return (
    <div className="flex flex-col ">
      <section className="grid md:mx-12 my-8 grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg">
        <div className="w-full flex flex-col justify-center items-center border-card rounded-md p-2">
          {isLoading ? (
            <Skeleton className="rounded-md h-[400px] w-full" />
          ) : (
            <img
              src={`${data && data.images[select]}`}
              alt=""
              className="rounded-md h-[400px]"
            />
          )}
          <div className="w-full flex justify-center mt-2">
            {isLoading ? (
              <>
                <Skeleton className="rounded-md h-[50px] w-[40px] m-2" />
                <Skeleton className="rounded-md h-[50px] w-[40px] m-2" />
                <Skeleton className="rounded-md h-[50px] w-[40px] m-2" />
              </>
            ) : (
              <>
                {data &&
                  data.images.map((i: any, index: any) => (
                    <div
                      className={`${
                        select === index ? "border rounded-md" : "null"
                      } cursor-pointer`}
                      key={index}
                    >
                      <img
                        src={`${i}`}
                        alt=""
                        className="h-[50px] overflow-hidden m-2 rounded-md"
                        onClick={() => setSelect(index)}
                      />
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
        <ProductDescriptionCard data={data} isLoading={isLoading} />
      </section>
      <ProductDetailsTab />
      <SuggestedProducts data={data} isLoading={isLoading} />
    </div>
  );
};

export default ProductDetailPage;
