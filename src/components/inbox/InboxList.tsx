import { server } from "@/server";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InboxList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
  navigationPath,
  path,
}: any) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();
  const handleClick = (id: any) => {
    navigate(`${navigationPath}?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user: any) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/${path}/${userId}`);
        path.includes("user") ? setUser(res.data.user) : setUser(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [me, data]);

  const handleItemClick = () => {
    setActive(index);
    handleClick(data._id);
    setCurrentChat(data);
    setUserData(user);
    setActiveStatus(online);
  };

  return (
    <>
      {user?.name ? (
        <div
          className={`w-full flex items-center p-1 ${
            active === index ? "bg-secondary rounded-md" : "bg-transparent"
          } cursor-pointer`}
          onClick={handleItemClick}
        >
          <div className="relative">
            <img
              src={user?.avatar}
              alt="avatar"
              className="object-cover relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-border-100 p-1"
            />
            <div
              className={`w-[10px] h-[10px] rounded-full absolute top-[1px] right-[1px] ${
                online ? "bg-green-400" : "bg-slate-600"
              }`}
            />
          </div>
          <div className="pl-3">
            <h1 className="text-base">{user?.name}</h1>
            <p className="text-sm text-muted-foreground">
              {data?.lastMessageId !== userData?._id
                ? "You:"
                : `${user?.name?.split(" ")[0]}:`}{" "}
              {data?.lastMessage}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default InboxList;