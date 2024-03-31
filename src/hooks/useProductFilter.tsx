import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { allProducts } = useSelector((state: any) => state.products);
  const categoryData = searchParams.get("category");

  useEffect(() => {
    const filterProducts = () => {
      if (categoryData === null) {
        setFilteredProducts(allProducts);
      } else {
        setFilteredProducts(
          allProducts.filter(
            (product: any) => product.category === categoryData
          )
        );
      }
    };

    filterProducts();
  }, [allProducts, categoryData]);

  return filteredProducts;
};

export default useProductFilter;
