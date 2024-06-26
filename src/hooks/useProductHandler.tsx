import { addTocart, removeFromCart } from "@/redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "@/redux/actions/wishlist";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useProductHandlers = (data: any) => {
  const { wishlist } = useSelector((state: any) => state.wishlist);
  const { cart } = useSelector((state: any) => state.cart);
  const [click, setClick] = useState(false);
  const dispatch: any = useDispatch();
  const [value, setValue] = useState(data?.qty);
  const totalPrice = data?.discountPrice * value;

  useEffect(() => {
    if (wishlist && wishlist.find((item: any) => item?._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = () => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
    toast.success("Item removed from wishlist!");
  };

  const addToWishlistHandler = () => {
    setClick(!click);
    dispatch(addToWishlist(data));
    toast.success("Item added to wishlist!");
  };

  const addToCartHandler = () => {
    const isItemExists =
      cart && cart.find((item: any) => item?._id === data?._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data?.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(data));
    toast.success("Item removed from cart!");
  };

  const incrementHandler = () => {
    if (data?.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      dispatch(addTocart(updateCartData));
    }
  };

  const decrementHandler = () => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    dispatch(addTocart(updateCartData));
  };

  return {
    click,
    removeFromWishlistHandler,
    addToWishlistHandler,
    addToCartHandler,
    removeFromCartHandler,
    incrementHandler,
    decrementHandler,
    totalPrice,
    value,
  };
};

export const useAvgRatingCalc = () => {
  const { products } = useSelector((state: any) => state.products);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviewsLength, setTotalReviewsLength] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  useEffect(() => {
    if (products && products.length > 0) {
      const totalReviewsLength = products.reduce(
        (acc: any, product: any) => acc + product.reviews.length,
        0
      );
      setTotalReviewsLength(totalReviewsLength);

      const totalRatings = products.reduce(
        (acc: any, product: any) =>
          acc +
          product.reviews.reduce(
            (sum: any, review: any) => sum + review.rating,
            0
          ),
        0
      );
      setTotalRatings(totalRatings);

      const avg: any = totalRatings / totalReviewsLength || 0;
      setAverageRating(avg.toFixed(2));
    } else {
      setAverageRating(0);
    }
  }, [products]);

  return [averageRating, totalReviewsLength, totalRatings];
};

export default useProductHandlers;
