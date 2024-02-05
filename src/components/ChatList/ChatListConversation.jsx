import React from "react";
import ChatItem from "./ChatItem";

const ChatListConversation = () => {
  return (
    <div className="h-[calc(100vh-129px)] px-4 py-2 border-t flex flex-col justify-start items-center overflow-scroll no-scrollbar">
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </div>
  );
};

export default ChatListConversation;
