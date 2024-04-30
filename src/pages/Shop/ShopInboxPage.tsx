import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { server, socket_server } from "@/server";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import Inbox from "@/components/inbox/Inbox";
import { Card } from "@/components/ui/card";
import InboxList from "@/components/inbox/InboxList";
import { useLocation } from "react-router-dom";
const ENDPOINT = socket_server;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const ShopInboxPage = () => {
  const { seller } = useSelector((state: any) => state.seller);
  const [conversations, setConversations] = useState<any[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [currentChat, setCurrentChat] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [images, setImages] = useState<any>();
  const [userData, setUserData] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<any>("");
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [activeStatus, setActiveStatus] = useState<any>(false);
  const [open, setOpen] = useState<any>(false);
  const scrollRef: any = useRef(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cId = queryParams.get("cId");
  const uId = queryParams.get("uId");

  useEffect(() => {
    if (uId && cId) setOpen(true);
  }, [uId, cId]);

  useEffect(() => {
    if (uId) {
      setActiveStatus(!!uId);
      const getUser = async () => {
        try {
          const res = await axios.get(`${server}/user/user-info/${uId}`);
          setUserData(res.data.user);
        } catch (error) {
          console.log(error);
        }
      };

      getUser();
    }
  }, [seller, uId]);
  useEffect(() => {
    socketId.on("getMessage", (data: any) => {
      setArrivalMessage({
        sender: cId || data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage?.sender)
    ) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat, uId]);

  useEffect(() => {
    if (seller) {
      const getConversation = async () => {
        try {
          const response = await axios.get(
            `${server}/conversation/get-all-conversation-seller/${seller?._id}`,
            {
              withCredentials: true,
            }
          );
          setConversations(response.data.conversations);
        } catch (error) {
          // console.log(error);
        }
      };
      getConversation();
    }
  }, [seller]);

  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat: any) => {
    const chatMembers = chat.members.find(
      (member: any) => member !== seller?._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        if (cId || currentChat) {
          const response = await axios.get(
            `${server}/message/get-all-messages/${cId || currentChat._id}`
          );
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [cId, currentChat]);

  // create new message
  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: cId || currentChat?._id,
    };
    const receiverId =
      uId || currentChat?.members.find((member: any) => member !== seller._id);

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage.trim() !== "") {
        const res = await axios.post(
          `${server}/message/create-new-message`,
          message
        );
        setMessages([...messages, res.data.message]);
        updateLastMessage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });
    try {
      if (cId || currentChat) {
        await axios.put(
          `${server}/conversation/update-last-message/${
            cId || currentChat._id
          }`,
          {
            lastMessage: newMessage,
            lastMessageId: seller._id,
          }
        );
        setNewMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
    setImages(file);
    imageSendingHandler(file);
  }
  };

  const imageSendingHandler = async (e: any) => {
    const formData = new FormData();

    formData.append("images", e);
    formData.append("sender", seller._id);
    formData.append("text", newMessage);
    formData.append("conversationId", cId || currentChat._id);

    const receiverId =
      cId || currentChat.members.find((member: any) => member !== seller._id);

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(`${server}/message/create-new-message`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setImages('');
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${cId || currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: seller._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <div className="w-full">
      {!open && (
        <Card className="rounded-lg p-2 m-2">
          <h1 className="text-center text-2xl py-3">All Messages</h1>
          {conversations.map((item: any, index: number) => (
            <InboxList
              key={index}
              data={item}
              index={index}
              setOpen={setOpen}
              setCurrentChat={setCurrentChat}
              me={seller?._id}
              setUserData={setUserData}
              userData={userData}
              online={onlineCheck(item)}
              setActiveStatus={setActiveStatus}
              navigationPath={"/shop/dashboard/inbox"}
              path={"user/user-info"}
              uId={uId}
            />
          ))}
        </Card>
      )}

      {open && (
        <Inbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          images={images}
          sellerId={seller?._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          setMessages={setMessages}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default ShopInboxPage;
