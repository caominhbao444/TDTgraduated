import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const ChatListSearch = () => {
  return (
    <div className="flex w-full relative justify-center items-center bg-slate-950">
      <input className="w-full outline-none p-1 cursor-pointer  border-none text-sm" />
      <SearchIcon
        className="absolute h-[14px] w-[14px] top-1 right-1 cursor-pointer"
        fontSize="small"
      />
    </div>
  );
};

export default ChatListSearch;
