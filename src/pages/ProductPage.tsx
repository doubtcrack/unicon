import { ProductCard } from "@/components/cards/productCard";
import ProductCardSkeleton from "@/components/skeleton/productCardSkeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categories } from "@/constants/site";
import useProductFilter from "@/hooks/useProductFilter";
import { PackageOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { filteredProducts, isLoading } = useProductFilter();
  const [category, setCategory]: any = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) navigate(`/products?category=${category}`);
  }, [category]);

  return (
    <>
      <h2 className="text-3xl my-8 md:text-4xl font-bold flex justify-center">
        All Required &nbsp;
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Products
        </span>
      </h2>
      <Select onValueChange={(e: any) => setCategory(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select your Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Categories &&
              Categories.map((i: any) => (
                <Link to={`/products?category=${i.title}`} key={i.id}>
                  <SelectItem value={i.title} key={i.id}>
                    {i.title}
                  </SelectItem>
                </Link>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <section className="grid md:mx-12 my-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <ProductCardSkeleton />
        ) : (
          <>
            {filteredProducts &&
              filteredProducts.map((i, index) => (
                <ProductCard
                  data={i}
                  index={index}
                  isLoading={isLoading}
                  key={index}
                />
              ))}
          </>
        )}
      </section>
      {filteredProducts && !isLoading && filteredProducts.length === 0 ? (
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
