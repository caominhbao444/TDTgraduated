import React from "react";
import ChatItem from "./ChatItem";

const ChatListConversation = (props) => {
  return (
    <div className="h-[calc(100vh-129px)] px-4 py-2 border-t flex flex-col justify-start items-center overflow-scroll no-scrollbar">
      <ChatItem handleClicked={props.handleClicked} />
      <ChatItem handleClicked={props.handleClicked} />
    </div>
  );
};

export default ChatListConversation;
