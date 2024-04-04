import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

// create order for user
export const createOrderForUser = (order: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: "createOrderForUserRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    const res = await axios.post(`${server}/order/create-order`, order, config);

    dispatch({
      type: "createOrderForUserSuccess",
      payload: res.data,
    });
    toast.success("Order successful!");
  } catch (error: any) {
    dispatch({
      type: "createOrderForUserFailed",
      payload: error.response.data?.message,
    });
    toast.error("Failed to create order. Please try again.");
  }
};

// create review for delievered order
export const createReview = (reviewData: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: "createReviewRequest",
    });

    const res = await axios.put(
      `${server}/product/create-new-review`,
      reviewData,
      { withCredentials: true }
    );
    dispatch({
      type: "createReviewSuccess",
      payload: res.data,
    });
    toast.success(res.data.message);
    dispatch(getAllOrdersOfUser(reviewData.user._id));
  } catch (error: any) {
    dispatch({
      type: "createReviewFailed",
      payload:
        error.response.data?.message ||
        "Failed to create review. Please try again.",
    });

    toast.error("Failed to create review. Please try again.");
  }
};

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
