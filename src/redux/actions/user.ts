import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

//login user
export const loginUser =
  (email: string, password: string, navigate: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: "LoginUserRequest",
      });
      await axios.post(
        `${server}/user/login-user`,
        { email, password },
        { withCredentials: true }
      );
      navigate("/");
      dispatch({
        type: "LoginUserSuccess",
      });
    } catch (error) {
      dispatch({
        type: "LoginUserFail",
        payload: "Invalid email or password",
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

// Logout user
export const logoutUser = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });
    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });
    dispatch({
      type: "LogoutUserSuccess",
      payload: data?.message,
    });
  } catch (error: any) {
    dispatch({
      type: "LogoutUserFail",
      payload: error.response.data?.message,
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
      payload: error.response.data?.message,
    });
  }
};

// user update information
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
    } catch (error: any) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data?.message,
      });
    }
  };

// update user avatar
export const updateAvatar = (formData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: "updateUserAvatarRequest" });

    const res = await axios.put(`${server}/user/update-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({ type: "updateUserAvatarSuccess" });
    dispatch(loadUser());
    toast.success("Avatar updated successfully!");
  } catch (error: any) {
    dispatch({ type: "updateUserAvatarFailed", payload: error.message });
    toast.error(error.message);
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
        payload: error.response.data?.message,
      });
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
      payload: error.response.data?.message,
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
      payload: error.response.data?.message,
    });
  }
};
