import ChatBox from "../ChatBox/ChatBox";
import ChatListConversation from "./ChatListConversation";
import ChatListHeader from "./ChatListHeader";
import ChatListSearch from "./ChatListSearch";

const ChatList = (props) => {
  return (
    <div className={props.className}>
      <ChatListHeader />
      <ChatListConversation handleClicked={props.handleClicked} />
    </div>
  );
};

export default ChatList;
