import { useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatList from "../../components/ChatList/ChatList";

const Chat = () => {
  const [selected, setSelected] = useState(false);
  const handleClicked = (choose) => {
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
      <ChatBox
        className={`w-full ${
          selected ? "block" : "hidden"
        } md:w-3/4 md:block  h-full bg-slate-600`}
        handleClicked={handleClicked}
        handleBack={handleBack}
      />
    </div>
  );
};

export default Chat;
