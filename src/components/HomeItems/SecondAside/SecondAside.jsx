import { Avatar } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

const SecondAside = () => {
  const [friends, setFriends] = useState()
  const userDetail = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    if(userDetail.id){
      axios.get(import.meta.env.VITE_APP_BASE_URL + '/friend-list/' + userDetail.id)
      .then((res) => {
        setFriends(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    
  }, [userDetail.id])
  const Friend = ({friend}) => {
    console.log(friend)
    return (
      <Link
        to={`/message/${1}`}
        className="flex justify-between items-center p-2 cursor-pointer"
      >
        <div className="flex justify-start items-center gap-2">
          <Avatar
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            sx={{ width: 30, height: 30 }}
          />
          <span>{friend.fullname}</span>
        </div>
        <div className="flex justify-center items-center">
          <CircleIcon color={friend.isOnline ? 'success' : 'disabled'} sx={{ fontSize: "12px" }} />
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
        {
          friends ? friends.map((friend) => (
            <Friend key={friend.id} friend={friend}></Friend>
          )) : null
        }
      </div>
    </div>
  );
};

export default SecondAside;
