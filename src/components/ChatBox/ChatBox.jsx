import { useParams } from "react-router-dom";
import ChatBoxConversation from "./ChatBoxConversation";
import ChatBoxHeader from "./ChatBoxHeader";
import { useState } from "react";

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
      />
      <ChatBoxConversation
        id={id}
        handleParam={handleParam}
        data={props.data}
      />
    </div>
  );
};

export default ChatBox;
