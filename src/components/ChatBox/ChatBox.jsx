import { useParams } from "react-router-dom";
import ChatBoxConversation from "./ChatBoxConversation";
import ChatBoxHeader from "./ChatBoxHeader";
import { useEffect, useState } from "react";
import socket from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";

const ChatBox = (props) => {
  const { id } = useParams();
  const [idParam, setIdParam] = useState();
  const handleParam = (idPa) => {
    setIdParam(idPa);
  };

  return (
    <div className={props.className}>
      <ChatBoxHeader
        id={id}
        handleParam={handleParam}
        handleBack={props.handleBack}
        handleClicked={props.handleClicked}
        nameFriend={props.nameFriend}
        isOnline={props.isOnline}
        selected={props.selected}
        room={props.room}
      />
      <ChatBoxConversation
        id={id}
        user={props.user}
        room={props.room}
        handleParam={handleParam}
        data={props.data}
      />
    </div>
  );
};

export default ChatBox;
