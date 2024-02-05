import ChatBox from "../ChatBox/ChatBox";
import ChatListConversation from "./ChatListConversation";
import ChatListHeader from "./ChatListHeader";
import ChatListSearch from "./ChatListSearch";

const ChatList = (props) => {
  return (
    <div className={props.className}>
      <ChatListHeader />
      <ChatListSearch />
      <ChatListConversation />
    </div>
  );
};

export default ChatList;
