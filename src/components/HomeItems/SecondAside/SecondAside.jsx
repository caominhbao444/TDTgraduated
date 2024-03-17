import { Avatar } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CallApiMyListFriends } from "../../../store/users2Slice";

const SecondAside = () => {
  const userDetail = useSelector((state) => state.user.userDetail);
  const listFriends = useSelector((state) => state.user2.listFriends);
  const authToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (userDetail.id) {
      dispatch(
        CallApiMyListFriends({
          headers: { authorization: `Bearer ${authToken}` },
          id: userDetail.id,
        })
      );
    }
  }, [userDetail.id, dispatch, authToken]);
  const Friend = ({ friend }) => {
    return (
      <Link
        to={`/message/${1}`}
        className="flex justify-between items-center p-2 cursor-pointer"
      >
        <div className="flex justify-start items-center gap-2">
          <Avatar
            alt="Remy Sharp"
            src={friend.image}
            sx={{ width: 30, height: 30 }}
          />
          <span>{friend.fullname}</span>
        </div>
        <div className="flex justify-center items-center">
          <CircleIcon
            color={friend.isOnline ? "success" : "disabled"}
            sx={{ fontSize: "12px" }}
          />
        </div>
      </Link>
    );
  };
  return (
    <div className="h-[100%] w-full box-border">
      <header className="font-bold bg-mainColor text-white text-[16px] flex justify-start items-center box-border p-2">
        Trực tuyến
      </header>
      <div className="h-[90%] w-full overflow-y-auto  overflow-x-hidden scrollbar-thin scrollbar-thumb-transparent no-scrollbar">
        {listFriends
          ? listFriends.map((friend) => (
              <Friend key={friend.id} friend={friend}></Friend>
            ))
          : null}
      </div>
    </div>
  );
};

export default SecondAside;
