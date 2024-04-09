import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state: any, action: any) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFail", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase("LogoutSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LogoutSellerSuccess", (state: any) => {
      state.isLoading = false;
      state.isSeller = false;
    })
    .addCase("LogoutSellerFail", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllSellersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllSellersSuccess", (state: any, action: any) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase("getAllSellerFailed", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state: any) => {
      state.error = null;
    });
});
