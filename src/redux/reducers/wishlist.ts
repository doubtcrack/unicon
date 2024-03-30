import { createReducer } from "@reduxjs/toolkit";

interface WishlistState {
  wishlist: any[];
}
const localStorageWishlist = localStorage.getItem("wishlistItems");
const initialState: WishlistState = {
  wishlist: localStorageWishlist ? JSON.parse(localStorageWishlist) : [],
};
export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishlist", (state: any, action: any) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i: any) => i._id === item._id);
      if (isItemExist) {
        state.wishlist = state.wishlist.map((i: any) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.wishlist.push(item);
      }
    })
    .addCase("removeFromWishlist", (state: any, action: any) => {
      state.wishlist = state.wishlist.filter(
        (i: any) => i._id !== action.payload
      );
    });
});
