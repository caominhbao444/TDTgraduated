import { useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatList from "../../components/ChatList/ChatList";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import { useSelector } from "react-redux";

const Chat = () => {
  const [selected, setSelected] = useState(false);
  const userDetail = useSelector((state) => state.user.userDetail);

  const handleClicked = (choose) => {
    console.log('choose', choose)
    setSelected(choose);
  };
  const handleBack = (choose) => {
    setSelected(choose);
  };
  return (
    <div className="w-full h-screen flex">
       <ChatList
        className={`w-full ${
          selected ? "hidden" : "block"
        } md:w-1/4 md:block h-full  flex flex-col`}
        handleClicked={handleClicked}
      />
      {
        selected ? 
        <ChatRoom user={userDetail} id={userDetail.id} room={userDetail.username+'-'+selected.username}/>
        : <p>Chọn bạn </p>
      }
    </div>
  );
};

export default Chat;
