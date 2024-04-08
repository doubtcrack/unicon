import { ProductCard } from "@/components/cards/productCard";
import useProductFilter from "@/hooks/useProductFilter";
import { PackageOpen } from "lucide-react";

const ProductPage = () => {
  const data = useProductFilter();
  return (
    <>
      <h2 className="text-3xl my-8 md:text-4xl font-bold flex justify-center">
        All Required &nbsp;
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Products
        </span>
      </h2>
      <section className="grid md:mx-12 my-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data && data.map((i, index) => <ProductCard data={i} index={index} />)}
      </section>
      {data && data.length === 0 ? (
        <div className="flex justify-center items-center flex-col h-[75vh]">
          <PackageOpen className="h-10 w-10 " />
          <h1 className="text-center pb-[100px] text-[20px]">
            No products Found!
          </h1>
        </div>
      ) : null}
    </>
  );
};

export default ProductPage;
