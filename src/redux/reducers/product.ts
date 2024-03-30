import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state: any, action: any) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state: any, action: any) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getAllProductsShopFailed", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state: any, action: any) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteProductFailed", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state: any, action: any) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase("getAllProductsFailed", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state: any) => {
      state.error = null;
    });
});
