import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder

    // create order for user
    .addCase("createOrderForUserRequest", (state: any) => {
      state.isLoading = true;
      state.error = null;
      state.order = null;
    })
    .addCase("createOrderForUserSuccess", (state: any, action: any) => {
      state.isLoading = false;
      state.order = action.payload;
    })
    .addCase("createOrderForUserFailed", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // get all orders of user
    .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state: any, action: any) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersUserFailed", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // get all orders of shop
    .addCase("getAllOrdersShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersShopSuccess", (state: any, action: any) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersShopFailed", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // get all orders for admin
    .addCase("adminAllOrdersRequest", (state: any) => {
      state.adminOrderLoading = true;
    })
    .addCase("adminAllOrdersSuccess", (state: any, action: any) => {
      state.adminOrderLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase("adminAllOrdersFailed", (state: any, action: any) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state: any) => {
      state.error = null;
    });
});
