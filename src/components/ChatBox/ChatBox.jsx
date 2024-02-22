import ChatBoxConversation from "./ChatBoxConversation";
import ChatBoxHeader from "./ChatBoxHeader";

const ChatBox = (props) => {
  return (
    <div className={props.className}>
      <ChatBoxHeader handleBack={props.handleBack} />
      <ChatBoxConversation data={props.data} />
    </div>
  );
};

export default ChatBox;
