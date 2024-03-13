import { Card, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const FriendCard = (props) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card sx={{ display: "flex", height: "150px", cursor: "pointer" }}>
      <div className="w-1/3 h-full">
        <img
          src={
            props.friend.image ||
            "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          }
          className="object-cover object-center h-full w-full"
          onClick={() => navigate(`/detail/${props.friend.id}`)}
        />
      </div>
      <div className="h-full w-2/3 flex justify-between">
        <div className="flex flex-col justify-center h-full pl-3">
          <h3
            className="text-[15px] font-bold cursor-pointer"
            onClick={() => navigate(`/detail/${props.friend.id}`)}
          >
            {props.friend.fullname}
          </h3>
          <span className="text-[13px] text-textLightColor">
            {props.friend.friends.length || 0} Bạn bè
          </span>
        </div>
        <div className="flex justify-center items-center pr-3">
          <IconButton
            aria-label="settings"
            className="relative"
            onClick={() => setIsEdit(!isEdit)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default FriendCard;
