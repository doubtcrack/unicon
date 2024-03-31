import HeroSection from "@/components/landingPage/hero";
import AboutSection from "@/components/landingPage/about";
import { HowItWorks } from "@/components/landingPage/howItWorks";
import { ProductCard } from "@/components/cards/productCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { PackageOpen } from "lucide-react";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector(
    (state: any) => state.products
  );
  const categoryData = searchParams.get("category");
  useEffect(() => {
    categoryData === null
      ? setData(allProducts)
      : setData(
          allProducts &&
            allProducts.filter((i: any) => i.category === categoryData)
        );
  }, [allProducts]);

  return (
    <>
      <>
        <HeroSection />

        <AboutSection />
        <HowItWorks />
        <h2 className="text-3xl md:text-4xl font-bold flex justify-center">
          Newly Added &nbsp;
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Products
          </span>
        </h2>
        <section className="grid md:mx-12 my-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
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
    </>
  );
};

export default HomePage;
