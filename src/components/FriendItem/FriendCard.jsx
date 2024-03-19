import { Card, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { CallApiInforUser, CallApiMyFriends } from "../../store/users2Slice";
import { useDispatch, useSelector } from "react-redux";

const FriendCard = (props) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const [isEdit, setIsEdit] = useState(false);
  const currentUser = useSelector((state) => state.user.userDetail);
  const inforUser = useSelector((state) => state.user2.inforUser);
  const [isLoading, setIsLoading] = useState(true);
  const myListFriends = useSelector((state) => state.user2.myListFriends);
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleDelete = () => {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + "/user-details/userFriendUpdate",
        {
          method: "delete",
          friendId: props.friend.id,
        },
        {
          headers: { authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        // dispatch(setUserDetails(response.data));
        dispatch(
          CallApiInforUser({
            headers: { authorization: `Bearer ${authToken}` },
            id: id,
          })
        );
        dispatch(
          CallApiMyFriends({
            headers: { authorization: `Bearer ${authToken}` },
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
        </div>
        {inforUser.id === myListFriends.id && (
          <div className="flex justify-center items-center pr-3">
            <IconButton
              aria-label="settings"
              className="relative"
              onClick={() => handleDelete()}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FriendCard;
