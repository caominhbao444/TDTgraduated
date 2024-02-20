import ChatBoxHeader from "./ChatBoxHeader";

const ChatBox = (props) => {
  return (
    <div className={props.className}>
      <ChatBoxHeader handleBack={props.handleBack} />
    </div>
  );
};

export default ChatBox;
