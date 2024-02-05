import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const ChatListSearch = () => {
  return (
    <div className="flex flex-col gap-1 px-4 py-2 border-t">
      <h3 className="text-[14px]">Tìm kiếm cuộc trò chuyện</h3>
      <div className="flex w-full relative justify-center items-center">
        <input
          placeholder="Nhập tên người dùng ..."
          className="w-full outline-none py-1 pl-2 pr-7 cursor-pointer  border text-sm"
        />
        <SearchIcon
          className="absolute top-1 right-2 cursor-pointer"
          fontSize="small"
        />
      </div>
    </div>
  );
};

export default ChatListSearch;
