import { Avatar } from "@mui/material";
import React from "react";

const ChatItem = () => {
  return (
    <div className="w-full bg-white hover:bg-slate-200 cursor-pointer py-2 px-1 flex gap-2 justify-start items-center">
      <Avatar
        alt="Remy Sharp"
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{ width: 40, height: 40 }}
      />
      <div className="flex flex-col w-full">
        <h3 className="text-[14px] font-medium">Cao Minh Bao</h3>
        <p className="text-[12px] text-textLightColor">Hoom nay la thu 2</p>
      </div>
    </div>
  );
};

export default ChatItem;
