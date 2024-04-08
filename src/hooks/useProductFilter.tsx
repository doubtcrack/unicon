import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { allProducts, isLoading } = useSelector(
    (state: any) => state.products
  );
  const categoryData = searchParams.get("category");

  useEffect(() => {
    const filterProducts = () => {
      if (categoryData === null) {
        setFilteredProducts(allProducts);
      } else {
        setFilteredProducts(
          allProducts?.filter(
            (product: any) => product.category === categoryData
          )
        );
      }
    };

    filterProducts();
  }, [categoryData, allProducts]);

  return { filteredProducts, isLoading };
};

export default useProductFilter;
