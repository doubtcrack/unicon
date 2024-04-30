import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
// create account
export const createAccount =
  (userData: any, navigate: any, path: any, afterpath: any) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: "CreateAccountRequest",
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const newUserFormData = new FormData();
      newUserFormData.append("file", userData?.avatar);
      newUserFormData.append("name", userData.name);
      newUserFormData.append("email", userData.email);
      newUserFormData.append("password", userData.password);

      const response = await axios.post(
        `${server}/${path}`,
        newUserFormData,
        config
      );

      dispatch({
        type: "CreateAccountSuccess",
        payload: response?.data,
      });

      toast.success(response?.data.message);
      navigate(afterpath);
    } catch (error: any) {
      dispatch({
        type: "CreateAccountFail",
        payload: error.response?.data.message || "Failed to create user",
      });

      toast.error(error.response?.data.message || "Failed to create user");
    }
  };

//login account
export const loginAccount =
  (email: string, password: string, navigate: any, path: any, afterpath: any) =>
  async (dispatch: any) => {
    const access = path.includes("shop") ? "LoadSeller" : "LoginAccount";
    try {
      dispatch({
        type: `${access}Request`,
      });
      const {data}:any = await axios.post(
        `${server}/${path}`,
        { email, password },
        { withCredentials: true }
      );     
      dispatch({
        type: `${access}Success`,
        payload: data?.user,
      });
      const redirectPath = sessionStorage.getItem("redirectPath");
      navigate(redirectPath || afterpath);
      sessionStorage.removeItem("redirectPath");
      path.includes("shop")
        ? localStorage.setItem("seller", "valid")
        : localStorage.setItem("user", "valid");

      toast.success("Logged in!");
    } catch (error: any) {
      dispatch({
        type: `${access}Fail`,
        payload: "Invalid email or password",
      });
      toast.error(error.response?.data.message || "mismatched user and pass");
    }
  };

// Logout account
export const logoutAccount =
  (navigate: any, path: any) => async (dispatch: any) => {
    const access = path.includes("shop") ? "LogoutSeller" : "LogoutAccount";
    try {
      dispatch({
        type: `${access}Request`,
      });
      const { data } = await axios.get(`${server}/${path}/logout`, {
        withCredentials: true,
      });
      dispatch({
        type: `${access}Success`,
        payload: data?.message,
      });
      path.includes("shop")
        ? localStorage.removeItem("seller")
        : localStorage.removeItem("user");
      navigate("/signin");
    } catch (error: any) {
      dispatch({
        type: `${access}Fail`,
        payload: error.response?.data?.message,
      });
    }
  };

// load user
export const loadUser = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data?.user,
    });
  } catch (error: any) {
    dispatch({
      type: "LoadUserFail",
      // payload: error.response.data?.message,
      payload: "Unauthorized Access!",
    });
  }
};

// load seller
export const loadSeller = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data?.seller,
    });
  } catch (error: any) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message,
    });
  }
};

// update avatar
export const updateAvatar =
  (formData: any, path: any) => async (dispatch: any) => {
    try {
      dispatch({ type: "updateAvatarRequest" });

      const { res }: any = await axios.put(`${server}/${path}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      dispatch({
        type: "updateAvatarSuccess",
        payload: {
          successMessage: "Avatar updated succesfully!",
          user: res?.user,
        },
      });
      path.includes("user") ? dispatch(loadUser()) : dispatch(loadSeller());
      toast.success("Avatar updated successfully!");
    } catch (error: any) {
      dispatch({
        type: "updateAvatarFailed",
        payload: error.response?.data?.message,
      });
      toast.error("Try Again!");
    }
  };

// update user information
export const updateUserInformation =
  (name: string, email: string, phoneNumber: number, password: string) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data?.user,
      });
      toast.success("Info updated!");
    } catch (error: any) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response?.data?.message,
      });
    }
  };

// update user password
export const updateUserPassword =
  (oldPassword: any, newPassword: any, confirmPassword: any) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: "updateUserPasswordRequest" });
      const res = await axios.put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      dispatch({
        type: "updateUserPasswordSuccess",
        payload: res?.data?.success,
      });
      toast.success("Password changed Successfully!");
    } catch (error: any) {
      dispatch({
        type: "updateUserPasswordFailed",
        payload: error.response?.data?.message,
      });
      toast.error(error.response?.data?.message);
    }
  };

// update user address
export const updatUserAddress =
  (
    country: string,
    city: string,
    address1: string,
    address2: string,
    zipCode: number,
    addressType: string
  ) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated succesfully!",
          user: data?.user,
        },
      });
    } catch (error: any) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response?.data?.message,
      });
    }
  };

// update shop information
export const updateShopInfo =
  (
    name: string,
    address: string,
    zipCode: any,
    phoneNumber: any,
    description: string
  ) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: "updateShopInfoRequest",
      });

      await axios.put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateShopInfoSuccess",
      });
      toast.success("Shop info updated successfully!");
      dispatch(loadSeller());
    } catch (error: any) {
      dispatch({
        type: "updateShopInfoFailed",
        payload: error.response?.data?.message,
      });
      toast.error("Failed to update shop info. Please try again.");
    }
  };

// delete user address
export const deleteUserAddress = (id: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data?.user,
      },
    });
  } catch (error: any) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response?.data?.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data?.users,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response?.data?.message,
    });
  }
};

// update seller order status
export const updateOrderStatus =
  (id: any, status: any, navigate: any) => async (dispatch: any) => {
    try {
      dispatch({ type: "UPDATE_ORDER_STATUS_REQUEST" });
      const res = await axios.put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      );

      dispatch({ type: "UPDATE_ORDER_STATUS_SUCCESS", payload: res?.data });

      toast.success("Order updated!");
      navigate("/shop/dashboard/orders");
    } catch (error: any) {
      dispatch({ type: "UPDATE_ORDER_STATUS_FAILURE", payload: error.message });
      toast.error(error.response?.data?.message || "Failed to update order.");
    }
  };
