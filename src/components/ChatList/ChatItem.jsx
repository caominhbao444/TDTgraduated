import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChatItem = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full bg-white hover:bg-slate-200 cursor-pointer py-2 px-1 flex gap-2 justify-start items-center"
      onClick={() => {
        props.handleClicked(props.friend);
        navigate(`/message/${props.friend.id}`);
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src={props.friend.image}
        sx={{ width: 40, height: 40 }}
      />
      <div className="flex flex-col w-full">
        <h3 className="text-[14px] font-medium">{props.friend.fullname}</h3>
        <p className="text-[12px] text-textLightColor">Hoom nay la thu 2</p>
      </div>
    </div>
  );
};

export default ChatItem;
