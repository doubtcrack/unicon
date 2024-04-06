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
    .addCase("CreateAccountRequest", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("CreateAccountSuccess", (state, action: any) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("CreateAccountFail", (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    })
    .addCase("LoginAccountRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoginAccountSuccess", (state, action: any) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoginAccountFail", (state, action: any) => {
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
    .addCase("LogoutAccountRequest", (state) => {
      state.loading = true;
    })
    .addCase("LogoutAccountSuccess", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase("LogoutAccountFail", (state, action: any) => {
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
    .addCase("updateAvatarRequest", (state: any) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("updateAvatarSuccess", (state: any, action: any) => {
      state.isLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
      state.error = null;
    })
    .addCase("updateAvatarFailed", (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("updateUserPasswordRequest", (state: any) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("updateUserPasswordSuccess", (state: any) => {
      state.isLoading = false;
      state.error = null;
    })
    .addCase("updateUserPasswordFailed", (state: any, action: any) => {
      state.isLoading = false;
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
    .addCase("updateShopInfoRequest", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("updateShopInfoSuccess", (state) => {
      state.loading = false;
    })
    .addCase("updateShopInfoFailed", (state, action: any) => {
      state.loading = false;
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
