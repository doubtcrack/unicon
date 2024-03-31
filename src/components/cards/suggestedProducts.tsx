import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "./productCard";

const SuggestedProducts = ({ data }: any) => {
  const { allProducts } = useSelector((state: any) => state.products);
  const [productData, setProductData]: any = useState();

  useEffect(() => {
    const d =
      allProducts &&
      allProducts.filter((i: any) => i?.category === data?.category);
    setProductData(d);
  }, []);

  return (
    <section className=" flex justify-center">
      <div className="max-w-screen-lg">
        {productData && (
          <h2 className="text-xl my-16 md:text-4xl font-semibold flex">
            Suggested &nbsp;
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Products
            </span>
          </h2>
        )}
        <div className="grid md:mx-12 my-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productData &&
            productData?.map((i: any, index: any) => (
              <ProductCard data={i} key={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestedProducts;
