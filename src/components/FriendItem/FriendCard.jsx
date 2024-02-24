import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const FriendCard = (props) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card sx={{ display: "flex", height: "150px", cursor: "pointer" }}>
      <div className="w-1/3 h-full">
        <img
          src={props.avatar}
          className="object-cover object-center h-full w-full"
          onClick={() => navigate("/detail")}
        />
      </div>
      <div className="h-full w-2/3 flex justify-between">
        <div className="flex flex-col justify-center h-full pl-3">
          <h3
            className="text-[15px] font-bold cursor-pointer"
            onClick={() => navigate("/detail")}
          >
            {props.name}
          </h3>
          <span className="text-[13px] text-textLightColor">150 bạn bè</span>
        </div>
        <div className="flex justify-center items-center pr-3">
          <IconButton aria-label="settings" className="relative">
            <DeleteIcon onClick={() => setIsEdit(!isEdit)} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default FriendCard;
