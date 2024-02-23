import React, { useState } from "react";
import ChatItem from "./ChatItem";
import SearchIcon from "@mui/icons-material/Search";
import { API_MESSAGES } from "../../fakeApi";
const ChatListConversation = (props) => {
  const [searchName, setSearchName] = useState("");
  const filteredConversations = API_MESSAGES.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchName.toLowerCase())
  );
  return (
    <>
      <div className="flex flex-col gap-1 px-4 py-2 border-t">
        <h3 className="text-[14px]">Tìm kiếm cuộc trò chuyện</h3>
        <div className="flex w-full relative justify-center items-center">
          <input
            placeholder="Nhập tên người dùng ..."
            className="w-full outline-none py-1 pl-2 pr-7 cursor-pointer  border text-sm"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <SearchIcon
            className="absolute top-1 right-2 cursor-pointer"
            fontSize="small"
          />
        </div>
      </div>
      <div className="h-[calc(100vh-129px)] px-4 py-2 border-t flex flex-col justify-start items-center overflow-scroll no-scrollbar">
        {filteredConversations &&
          filteredConversations.map((conversation) => {
            return (
              <ChatItem
                handleClicked={props.handleClicked}
                key={conversation.id}
                name={conversation.name}
                id={conversation.id}
                avatar={conversation.img_avatar}
              />
            );
          })}
      </div>
    </>
  );
};

export default ChatListConversation;
