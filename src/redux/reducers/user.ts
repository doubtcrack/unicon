import { createReducer } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  user?: any;
  addressloading: boolean;
  successMessage?: string;
  error?: string | null;
  usersLoading: boolean;
  users?: any[];
}

const initialState: UserState = {
  isAuthenticated: false,
  loading: false,
  addressloading: false,
  usersLoading: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoginUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoginUserSuccess", (state, action: any) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoginUserFail", (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action: any) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("LogoutUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LogoutUserSuccess", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase("LogoutUserFail", (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action: any) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFailed", (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action: any) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFailed", (state, action: any) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    .addCase("deleteUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action: any) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("deleteUserAddressFailed", (state, action: any) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    .addCase("getAllUsersRequest", (state) => {
      state.usersLoading = true;
    })
    .addCase("getAllUsersSuccess", (state, action: any) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase("getAllUsersFailed", (state, action: any) => {
      state.usersLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state: any) => {
      state.successMessage = null;
    });
});
