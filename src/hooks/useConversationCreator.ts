import { createConversation } from "@/redux/actions/conversation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useProductFilter from "./useProductFilter";
import { useNavigate } from "react-router-dom";

const useConversationCreator = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { user, isAuthenticated }: any = useSelector(
    (state: any) => state.user
  );
  const { conversationId }: any = useSelector((state: any) => state.chat);
  const { filteredProducts, isLoading }: any = useProductFilter();

  const handleMessageSubmit = async () => {
    if (isAuthenticated && !isLoading) {
      const groupTitle = filteredProducts?._id + user?._id;
      const userId = user?._id;
      const sellerId = filteredProducts.shop?._id;
      await dispatch(createConversation(groupTitle, userId, sellerId));
      navigate(`/inbox?${conversationId}`);
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return { handleMessageSubmit };
};

export default useConversationCreator;
