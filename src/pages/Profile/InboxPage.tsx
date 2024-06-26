import { server, socket_server } from "@/server";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import InboxList from "@/components/inbox/InboxList";
import Inbox from "@/components/inbox/Inbox";
import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

const ENDPOINT = socket_server;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const InboxPage = () => {
  const { user } = useSelector((state: any) => state.user);
  const [conversations, setConversations] = useState<any[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [currentChat, setCurrentChat] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [images, setImages] = useState<any>();
  const [newMessage, setNewMessage] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [activeStatus, setActiveStatus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
          const res = await axios.get(`${server}/shop/get-shop-info/${uId}`);
          setUserData(res.data.shop);
        } catch (error) {
          console.log(error);
        }
      };

      getUser();
    }
  }, [user]);
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
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
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user) {
      const getConversations = async () => {
        try {
          const response = await axios.get(
            `${server}/conversation/get-all-conversation-user/${user?._id}`,
            { withCredentials: true }
          );
          setConversations(response.data.conversations);
        } catch (error) {
          console.log(error);
        }
      };
      getConversations();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const userId = user._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

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

  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: cId || currentChat?._id,
    };
    const receiverId =
      currentChat?.members.find((member: any) => member !== user._id) || uId;

    socketId.emit("sendMessage", {
      senderId: user._id,
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
      lastMessageId: user._id,
    });

    try {
      if (cId || currentChat) {
        await axios.put(
          `${server}/conversation/update-last-message/${
            cId || currentChat._id
          }`,
          {
            lastMessage: newMessage,
            lastMessageId: user._id,
          }
        );
        setNewMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { 
      setImages(file);
      imageSendingHandler(file);
    }
  };

  const imageSendingHandler = async (file: File) => {
    const formData = new FormData();

    formData.append("images", file);
    formData.append("sender", user._id);
    formData.append("text", newMessage);
    formData.append("conversationId", cId || currentChat?._id);

    const receiverId =
      cId || currentChat?.members.find((member: any) => member !== user._id);

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: file,
    });

    try {
      const res = await axios.post(
        `${server}/message/create-new-message`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImages('');
      setMessages([...messages, res.data.message]);
      updateLastMessageForImage();
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    try {
      if (currentChat) {
        await axios.put(
          `${server}/conversation/update-last-message/${
            cId || currentChat._id
          }`,
          {
            lastMessage: "Photo",
            lastMessageId: user._id,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onlineCheck = (chat: any) => {
    const chatMembers = chat.members.find(
      (member: any) => member !== user?._id
    );
    return !!onlineUsers.find((user: any) => user.userId === chatMembers);
  };

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
              me={user?._id}
              setUserData={setUserData}
              userData={userData}
              online={onlineCheck(item)}
              setActiveStatus={setActiveStatus}
              navigationPath={"/dashboard/inbox"}
              path={"shop/get-shop-info"}
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
          sellerId={user?._id}
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

export default InboxPage;
