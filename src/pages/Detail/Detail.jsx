import React, { useEffect, useState } from "react";
import SecondAside from "../../components/HomeItems/SecondAside/SecondAside";
import Header from "../../components/DetailItems/Header";
import Body from "../../components/DetailItems/Body";
import { useParams } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import PhotoIcon from "@mui/icons-material/Photo";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import {
  CallApiInforUser,
  CallApiMyFriends,
  CallApiMyListFriends,
} from "../../store/users2Slice";
import axios from "axios";
import { IconButton, Tooltip } from "@mui/material";
let actions = [
  {
    id: 1,
    icon: <GroupAddIcon />,
    name: "Thêm bạn bè",
    disabled: true,
    method: "add",
  },

  {
    id: 2,
    icon: <DeleteIcon />,
    name: "Hủy bạn bè",
    disabled: true,
    method: "delete",
  },
];
const Detail = () => {
  const [activeTab, setActiveTab] = useState(0);
  const authToken = localStorage.getItem("token");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const inforUser = useSelector((state) => state.user2.inforUser);
  const listFriends = useSelector((state) => state.user2.listFriends);
  const currentUser = useSelector((state) => state.user.userDetail);
  const [open, setOpen] = useState(false);
  const [isAct, setIsAct] = useState(false);
  const dispatch = useDispatch();
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    dispatch(
      CallApiInforUser({
        headers: { authorization: `Bearer ${authToken}` },
        id: id,
      })
    ).then(() => setIsLoading(false));
  }, [id, dispatch, authToken]);
  useEffect(() => {
    if (isAct) {
      dispatch(
        CallApiInforUser({
          headers: { authorization: `Bearer ${authToken}` },
          id: id,
        })
      ).then(() => setIsLoading(false));
    }
  }, [isAct]);
  useEffect(() => {
    dispatch(
      CallApiMyListFriends({
        headers: { authorization: `Bearer ${authToken}` },
        id: id,
      })
    ).then(() => setIsLoading(false));
  }, [id, dispatch, authToken]);

  //header

  const handleUpdateFriends = (method) => {
    // console.log(method);
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + "/user-details/userFriendUpdate",
        {
          method: method,
          friendId: inforUser.id,
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

        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (inforUser && currentUser && !isLoading) {
      if (
        inforUser.friends.filter((el) => el.id == currentUser.id).length > 0
      ) {
        actions[0].disabled = true;

        actions[1].disabled = false;
      } else {
        actions[0].disabled = false;

        actions[1].disabled = true;
      }
    }
  }, [inforUser, currentUser]);

  ////////////////////////////////
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-9 md:gap-8 min-h-screen bg-[#f7f7f7]">
      <main className="md:col-span-7 flex flex-col md:gap-3 md:py-4 mt-[42px] md:mt-[58px] md:pl-8">
        {/* <Header
          handleActiveTab={handleActiveTab}
          user={inforUser}
          isAct={isAct}
        /> */}
        <div className="flex flex-col w-full">
          <div className="w-full md:h-[40vh] h-[30vh] relative">
            <img
              src="https://images.unsplash.com/photo-1682687220866-c856f566f1bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full object-cover"
            />

            {currentUser.id != inforUser.id ? (
              <div
                className="absolute top-4 right-4 flex justify-center items-center w-[25px] h-[25px]  rounded-[100%] border"
                onClick={() => setOpen(!open)}
              >
                <MoreVertOutlinedIcon className="text-white cursor-pointer rounded-[100%]" />
              </div>
            ) : (
              <></>
            )}

            {open && (
              <div className="absolute top-3 md:top-[50px] right-12 md:right-6 flex flex-col gap-1 md:gap-2">
                {actions
                  .filter((el) => !el.disabled)
                  .map((item, index) => {
                    return (
                      <>
                        <Tooltip
                          title={item.name}
                          key={index}
                          placement="left-start"
                        >
                          <IconButton
                            sx={{ color: "white" }}
                            onClick={() => handleUpdateFriends(item.method)}
                          >
                            {item.icon}
                          </IconButton>
                        </Tooltip>
                      </>
                    );
                  })}
              </div>
            )}
          </div>
          <div className="w-full flex border-b border-x">
            <div
              className={`w-1/5 md:p-5 p-0 text-center flex justify-center items-center`}
              onClick={() => handleActiveTab(0)}
            >
              <p
                className={` ${
                  activeTab === 0 ? "text-black" : "text-textLightColor"
                } text- text-[14px] font-semibold cursor-pointer md:block hidden`}
              >
                Thông tin cá nhân
              </p>
              <div className="md:hidden block">
                <AssignmentIndIcon
                  className={`${
                    activeTab === 0 ? "text-black" : "text-textLightColor"
                  } cursor-pointer`}
                />
              </div>
            </div>
            <div
              className="w-1/5 md:p-5 p-0 text-center flex justify-center items-center"
              onClick={() => handleActiveTab(1)}
            >
              <p
                className={` ${
                  activeTab === 1 ? "text-black" : "text-textLightColor"
                } text- text-[14px] font-semibold cursor-pointer md:block hidden`}
              >
                Bài viết
              </p>
              <div className="md:hidden block">
                <FeedIcon
                  className={`${
                    activeTab === 1 ? "text-black" : "text-textLightColor"
                  } cursor-pointer`}
                />
              </div>
            </div>
            <div className="w-1/5 md:p-5 p-2 relative flex justify-center items-center">
              <img
                src={inforUser.image}
                className="md:w-[150px] md:h-[150px] w-[20vw] h-[20vw] absolute md:-top-[140px] -top-[19vw] object-cover object-center rounded-[100%] left-1/2 -translate-x-1/2 translate-x"
              />
              <p className="text-center md:text-[14px] text-[2vw] font-semibold whitespace-nowrap">
                {inforUser.fullname}
              </p>
            </div>
            <div
              className="w-1/5 md:p-5 p-0 text-center flex justify-center items-center"
              onClick={() => handleActiveTab(2)}
            >
              <p
                className={` ${
                  activeTab === 2 ? "text-black" : "text-textLightColor"
                } text- text-[14px] font-semibold cursor-pointer md:block hidden`}
              >
                Bạn bè
              </p>
              <div className="md:hidden block">
                <PeopleIcon
                  className={`${
                    activeTab === 2 ? "text-black" : "text-textLightColor"
                  } cursor-pointer`}
                />
              </div>
            </div>
            <div
              className="w-1/5 md:p-5 p-0 text-center flex justify-center items-center"
              onClick={() => handleActiveTab(3)}
            >
              <p
                className={` ${
                  activeTab === 3 ? "text-black" : "text-textLightColor"
                } text- text-[14px] font-semibold cursor-pointer md:block hidden`}
              >
                Ảnh
              </p>
              <div className="md:hidden block">
                <PhotoIcon
                  className={`${
                    activeTab === 3 ? "text-black" : "text-textLightColor"
                  } cursor-pointer`}
                />
              </div>
            </div>
          </div>
        </div>
        <Body activeTab={activeTab} user={inforUser} />
      </main>
      <aside className="bg-white md:col-span-2 hidden md:flex flex-col  sticky top-[58px]  h-[calc(100vh-58px)]">
        <SecondAside />
      </aside>
    </div>
  );
};

export default Detail;
