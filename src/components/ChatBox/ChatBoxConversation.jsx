import Message from "./Message";

const ChatBoxConversation = () => {
  return (
    <div className="h-[calc(100vh-116px)] bg-[#D6D6D6] overflow-scroll no-scrollbar box-border md:px-2 md:py-1 flex flex-col-reverse ">
      <Message />
    </div>
  );
};

export default ChatBoxConversation;
