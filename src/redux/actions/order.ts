import axios from "axios";
import { server } from "../../server";

// get all orders of user
export const getAllOrdersOfUser = (userId: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data?.orders,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data?.message,
    });
  }
};

// get all orders of seller
export const getAllOrdersOfShop = (shopId: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: "getAllOrdersShopRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`
    );

    dispatch({
      type: "getAllOrdersShopSuccess",
      payload: data?.orders,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllOrdersShopFailed",
      payload: error.response.data?.message,
    });
  }
};

// get all orders of Admin
export const getAllOrdersOfAdmin = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "adminAllOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data?.orders,
    });
  } catch (error: any) {
    dispatch({
      type: "adminAllOrdersFailed",
      payload: error.response.data?.message,
    });
  }
};
