import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useProductFilter from "./useProductFilter";
import { useNavigate, useParams } from "react-router-dom";
import { createConversation } from "@/redux/actions/conversation";
import { useState } from "react";

const useConversationCreator = () => {
  const navigate: any = useNavigate();
  const dispatch: any = useDispatch();
  const { user, isAuthenticated } = useSelector((state: any) => state.user);
  const { conversationId } = useSelector((state: any) => state.chat);
  const { filteredProducts }: any = useProductFilter();
  const [isChatLoading, setIsChatLoading] = useState(false);
  const { id } = useParams();
  let data = filteredProducts?.find((i: any) => i._id === id);

  const handleMessageSubmit = async () => {
    if (isAuthenticated && !isChatLoading) {
      setIsChatLoading(true);
      const groupTitle = data?.shopId + user?._id;
      const userId = user?._id;
      const sellerId = data.shopId;
      try {
        await dispatch(createConversation(groupTitle, userId, sellerId));
        if (conversationId) {
          navigate(`/dashboard/inbox?cId=${conversationId}&sId=${data.shopId}`);
        }
      } catch (error) {
        toast.error("Error creating conversation");
      } finally {
        setIsChatLoading(false);
      }
    } else {
      if (localStorage.getItem("user") != "valid")
        toast.error("Please login to create a conversation");
    }
  };

  return { handleMessageSubmit, isChatLoading, conversationId };
};

export default useConversationCreator;
