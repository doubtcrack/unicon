import { createReducer } from "@reduxjs/toolkit";

interface CartState {
  cart: any[];
}
const localStorageCart = localStorage.getItem("cartItems");
const initialState: CartState = {
  cart: localStorageCart ? JSON.parse(localStorageCart) : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state: any, action: any) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i: any) => i._id === item._id);
      if (isItemExist) {
        state.cart = state.cart.map((i: any) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cart.push(item);
      }
    })
    .addCase("removeFromCart", (state: any, action: any) => {
      state.cart = state.cart.filter((i: any) => i._id !== action.payload);
    });
});
