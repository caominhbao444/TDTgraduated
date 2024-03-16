import { useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatList from "../../components/ChatList/ChatList";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chat = () => {
  const [selected, setSelected] = useState(false);
  const userDetail = useSelector((state) => state.user.userDetail);
  console.log('userDetail', userDetail)
  console.log('selected', selected)
  const handleClicked = (choose) => {
    console.log("choose", choose);
    setSelected(choose);
  };
  const handleBack = (choose) => {
    setSelected(choose);
  };
  const params = useParams()
  return (
    <div className="w-full h-screen flex">
      <ChatList
        className={`w-full ${
          selected ? "hidden" : "block"
        } md:w-1/4 md:block h-full  flex flex-col`}
        handleClicked={handleClicked}
      />
      {/* <ChatBox
        className={`w-full ${
          selected ? "block" : "hidden"
        } md:w-3/4 md:block  h-full bg-slate-600`}
        handleClicked={handleClicked}
        handleBack={handleBack}
      /> */}
      <ChatRoom user={userDetail} id={params.id} room={userDetail.username+'-'+selected.username}/>
    </div>
  );
};

export default Chat;
