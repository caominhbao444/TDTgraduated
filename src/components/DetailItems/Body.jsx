import {
  Avatar,
  Card,
  CardHeader,
  Dialog,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Skeleton,
  Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import PostContainer from "../HomeItems/PostContainer/PostContainer";
import { API_MESSAGES, API_POST } from "../../fakeApi";
import FriendCard from "../FriendItem/FriendCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CallApiDetailsListPosts } from "../../store/postsSlice";
import axios from "axios";

const Body = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  const authToken = localStorage.getItem("token");
  const [friends, setFriends] = useState();
  const [userDetails, setUserDetails] = useState();
  const myDetailsPost = useSelector((state) => state.post.myDetailsPost);
  const userDetail = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const handleChange = () => {
    setChecked(!checked);
  };
  const handleNavigate = (id) => {
    navigate(`/post/${id}`);
  };
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + `/user-details/?id=${params.id}`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log("???", res);
        setUserDetails(res.data);
        dispatch(
          CallApiDetailsListPosts({
            headers: { authorization: `Bearer ${authToken}` },
            id: params.id,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/friend-list/" + params.id, {
        headers: { authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        setFriends(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (userDetail.id) {
      dispatch(
        CallApiDetailsListPosts({
          headers: { authorization: `Bearer ${authToken}` },
          id: userDetail.id,
        })
      );
    }
  }, [userDetail.id, dispatch, authToken]);
  if (!userDetails) {
    return null;
  }
  return (
    <div className=" bg-white w-full flex justify-center items-start">
      {props.activeTab === 0 && (
        <div className="flex flex-col w-full md:w-2/3 p-5 md:gap-3 gap-1">
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Họ và tên
            </div>
            <div className="w-1/2 flex justify-between items-center">
              {isEdit ? (
                <input className="w-2/3 p-1 outline-none border text-[2vw] md:text-[15px]" />
              ) : (
                <span className="text-[2vw] md:text-[15px] font-normal">
                  {userDetails.fullname}
                </span>
              )}
              <div onClick={() => setIsEdit(!isEdit)}>
                <EditIcon className="h-full w-full cursor-pointer" />
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Tên đăng nhập
            </div>
            <div className="w-1/2 flex justify-between items-center">
              {isEdit ? (
                <input className="w-2/3 p-1 outline-none border text-[2vw] md:text-[15px]" />
              ) : (
                <span className="text-[2vw] md:text-[15px] font-normal">
                  {userDetails.username}
                </span>
              )}
              <div onClick={() => setIsEdit(!isEdit)}>
                <EditIcon className="h-full w-full cursor-pointer" />
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Email
            </div>
            <div className="w-1/2 flex justify-between items-center">
              <span className="text-[2vw] md:text-[15px] font-normal">
                {userDetails.email}
              </span>
              <div className="hidden">
                <EditIcon className="h-full w-full" />
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Giới tính
            </div>
            <div className="w-1/2 flex justify-between items-center">
              <span className="text-[2vw] md:text-[15px] font-normal">
                {userDetails.gender}
              </span>
              <div>
                <EditIcon className="h-full w-full" />
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Quê quán
            </div>
            <div className="w-1/2 flex justify-between items-center">
              <span className="text-[2vw] md:text-[15px] font-normal">
                {userDetails.country}
              </span>
              <div>
                <EditIcon className="h-full w-full" />
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Khoa
            </div>
            <div className="w-1/2 flex justify-between items-center">
              <span className="text-[2vw] md:text-[15px] font-normal">
                {userDetails.faculty}
              </span>
              <div>
                <EditIcon className="h-full w-full" />
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Khóa
            </div>
            <div className="w-1/2 flex justify-between items-center">
              <span className="text-[2vw] md:text-[15px] font-normal">
                Khóa {userDetails.course}
              </span>
              <div>
                <EditIcon className="h-full w-full" />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center w-full">
            <div className="flex gap-2">
              <div className="px-3 py-1 border cursor-pointer rounded-sm">
                Hủy
              </div>
              <div className="px-3 py-1 border cursor-pointer bg-mainColor rounded-sm text-white">
                Lưu
              </div>
            </div>
          </div>
        </div>
      )}
      {props.activeTab === 1 && (
        <div className="flex flex-col w-full md:p-10 md:gap-3 gap-3">
          {myDetailsPost &&
            [...myDetailsPost].reverse().map((post, index) => {
              return <PostContainer key={index} post={post} />;
            })}
        </div>
      )}
      {props.activeTab === 2 && (
        <div className="flex flex-col w-full p-5">
          <Card className="w-full h-full bg-white">
            <div className="px-3 py-2 border-b flex justify-between items-center">
              <h3 className="font-bold text-[18px]">Bạn bè</h3>
              <div className="flex gap-1 items-center">
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <span className="text-[14px] font-semibold">
                  Xếp theo thời gian
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              {friends
                ? friends.map((friend) => {
                    return <FriendCard key={friend.id} friend={friend} />;
                  })
                : null}
            </div>
          </Card>
        </div>
      )}
      {props.activeTab === 3 && (
        <div className="w-full p-5">
          <ImageList
            gap={20}
            sx={{
              md: 8,
              gridTemplateColumns:
                "repeat(auto-fill,minmax(280px,1fr))!important",
            }}
          >
            {myDetailsPost &&
              [...myDetailsPost].reverse().map((item, index) => {
                return (
                  <Card key={index}>
                    <ImageListItem
                      onClick={() => handleNavigate(item.id)}
                      sx={{ height: "200px !important" }}
                    >
                      <img
                        src={item.media}
                        alt={item.media}
                        loading="lazy"
                        style={{ cursor: "pointer" }}
                      />
                    </ImageListItem>
                  </Card>
                );
              })}
          </ImageList>
        </div>
      )}
    </div>
  );
};

export default Body;
