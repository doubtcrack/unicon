import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timeAgo } from "@/lib/timeago";
import { ArrowRight, Images, Send } from "lucide-react";
import { useState } from "react";
import { SVGIcons } from "../svgIcons";
import axios from "axios";
import { server } from "@/server";

const Inbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  images,
  setMessages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}: any) => {
  const [activeStatusText] = useState(activeStatus ? "active" : "inactive");
  const handleDeleteMessage = async (id:any) => {
    try {
      await axios.delete(`${server}/message/delete-messages/${id}`);
      setMessages((prevMessages:any) => prevMessages.filter((message:any) => message._id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="w-full h-[80vh] flex flex-col justify-between p-2 rounded-lg">
      {/* message header */}
      <div className="w-full h-[10vh] flex p-3 items-center justify-between rounded-t-xl bg-primary">
        <div className="flex">
          <img
            src={userData?.avatar}
            alt=""
            className="object-cover relative w-[25px] h-[25px] cursor-pointer overflow-hidden rounded-full border border-border p-1"
          />
          <div className="pl-3 flex items-center justify-between text-base">
            <h1 className="font-bold">{userData?.name}</h1>
            <h1>&nbsp; is {activeStatusText}</h1>
          </div>
        </div>
        <ArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <ScrollArea className="h-full border border-border p-4">
        {messages &&
          messages.map((item: any, index: any) => (
            <div
              key={index}
              className={`flex w-full my-2 ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              }`}
              ref={scrollRef}
            >
              {item.sender !== sellerId && (
                <img
                  src={userData?.avatar}
                  className="w-[30px] h-[30px] mr-3 object-cover relative cursor-pointer overflow-hidden rounded-full border border-border-100 p-1"
                  alt="avatar"
                />
              )}
              {item.images && (
                <>
                <img
                  src={item.images}
                  className="w-[120px] h-[120px] 800px:w-[200px] 800px:h-[200px] object-cover rounded-lg ml-2 mb-2 z-0"
                  alt="chat images"
                />
                <span className="inline z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer bg-sky-100 text-zinc-800 h-fit rounded-sm" onClick={() => handleDeleteMessage(item._id)}>
                     <SVGIcons.delete />
                </span>
                </>
              )}
              {item.text !== "" && (
                <div className="flex flex-col w-[40%]">
                  <div
                    className={`flex  justify-between relative ml-3 text-sm py-2 px-4 shadow rounded-xl ${
                      item.sender === sellerId ? "bg-indigo-100" : "bg-white"
                    } text-muted-foreground h-min`}
                  >
                    <p>{item.text}</p>
                    <span className="z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer text-gray-900" onClick={() => handleDeleteMessage(item._id)}>
                      <SVGIcons.delete/>
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground pt-1 ">
                    {timeAgo(item.createdAt)}
                  </p>
                </div>
              )}
            </div>
          ))}

{images && <div className=" flex w-full justify-end ">
           <img
            src={URL.createObjectURL(images)}
            className="w-[120px] h-[120px] 800px:w-[200px] 800px:h-[200px] object-cover rounded-lg ml-2 mb-2 z-0 opacity-30"
            alt="chat images"
          />
          <span className="text-muted-foreground relative top-20">Loading...</span>
          </div>}
      </ScrollArea>

      {/* send message input */}
      <form
        aria-required={true}
        className="flex flex-row items-center h-[10vh] rounded-b-xl bg-primary w-full px-4"
        onSubmit={sendMessageHandler}
      >
        <div>
          <Input
            type="file"
            name=""
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <Images
              className="flex items-center justify-center text-current hover:text-muted cursor-pointer"
              size={20}
            />
          </label>
        </div>
        <div className="flex-grow ml-4">
          <div className="relative w-full text-white">
            <Input
              type="text"
              required
              placeholder="Enter your message..."
              className="!placeholder-slate-50"
              value={newMessage}
              onChange={(e: any) => setNewMessage(e.target.value)}
            />
            <Input type="submit" value="Send" className="hidden" id="send" />
          </div>
        </div>
        <div className="ml-4">
          <Button variant={"outline"}>
            <span className="hidden 800px:block">Send</span>
            <label htmlFor="send">
              <Send size={12} className="cursor-pointer m-2 " />
            </label>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Inbox;
