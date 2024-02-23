import { useEffect, useState } from "react";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material";
import Loading from "../Loading/Loading";
const ChatBoxConversation = (props) => {
  useEffect(() => {}, [props.id]);
  return (
    <div className="h-[calc(100vh-58px)] bg-[#D6D6D6] overflow-scroll no-scrollbar box-border w-full flex flex-col justify-between">
      {props.id ? (
        <>
          <div className=" w-full h-full overflow-scroll no-scrollbar flex flex-col-reverse relative gap-4 py-2 px-3">
            <div className="w-full h-full top-0 left-0 right-0 bg-3d absolute"></div>
            {/* <Loading /> */}
            <Message />
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full bg-[#F2F2F2] flex justify-center items-center">
            Vui lòng chọn cuộc trò chuyện
          </div>
        </>
      )}

      <div className="bg-[#E6E6E6] w-full h-[58px] box-border p-2 flex items-center justify-center">
        <textarea className="md:w-[95%] w-[90%] h-[42px] max-h-[100px] resize-none border-none outline-none px-2 py-1" />
        <div className="md:w-[5%] w-[10%] flex items-end justify-center">
          <SendIcon className="h-full w-full cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ChatBoxConversation;
