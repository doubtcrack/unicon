// add to wishlist
export const addToWishlist =
  (data: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: "addToWishlist",
      payload: data,
    });

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(getState().wishlist.wishlist)
    );
    return data;
  };

// remove from wishlist
export const removeFromWishlist =
  (data: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: "removeFromWishlist",
      payload: data?._id,
    });
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(getState().wishlist.wishlist)
    );
    return data;
  };
