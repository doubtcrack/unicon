import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

export const createConversation =
  (groupTitle: string, userId: string, sellerId: string) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: "CREATE_CONVERSATION_REQUEST" });
      const res = await axios.post(
        `${server}/conversation/create-new-conversation`,
        {
          groupTitle,
          userId,
          sellerId,
        }
      );
      const conversationId = res.data.conversation._id;
      dispatch(createConversationSuccess(conversationId));
    } catch (error: any) {
      dispatch(createConversationFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

const createConversationSuccess = (conversationId: string) => ({
  type: "CREATE_CONVERSATION_SUCCESS",
  payload: conversationId,
});

const createConversationFailure = (errorMessage: string) => ({
  type: "CREATE_CONVERSATION_FAILURE",
  payload: errorMessage,
});
