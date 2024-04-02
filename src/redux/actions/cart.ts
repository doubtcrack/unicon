// add to cart
export const addTocart =
  (data: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: "addToCart",
      payload: data,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  };

// remove from cart
export const removeFromCart =
  (data: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: "removeFromCart",
      payload: data?._id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  };

// clear cart
export const clearCart = () => ({
  type: "clearCart",
});
