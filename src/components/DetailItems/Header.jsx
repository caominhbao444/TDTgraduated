import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import PhotoIcon from "@mui/icons-material/Photo";
import {
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useSelector } from 'react-redux';

const actions = [
  { icon: <GroupAddIcon />, name: "Thêm bạn bè" },
  { icon: <EmailIcon />, name: "Nhắn tin" },
  { icon: <DeleteIcon />, name: "Hủy bạn bè" },
];
const Header = (props) => {
  const [isActive, setIsActive] = useState(0);
  const [open, setOpen] = useState(false);
  const handleActive = (active) => {
    setIsActive(active);
    props.handleActiveTab(active);
  };
  const userDetail = useSelector((state) => state.user.userDetail);
  console.log(userDetail)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full md:h-[40vh] h-[30vh] relative">
        <img
          src="https://images.unsplash.com/photo-1682687220866-c856f566f1bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute top-4 right-4 flex justify-center items-center w-[25px] h-[25px]  rounded-[100%] border"
          onClick={() => setOpen(!open)}
        >
          <MoreVertOutlinedIcon className="text-white cursor-pointer rounded-[100%]" />
        </div>
        {open && (
          <div className="absolute top-3 md:top-[50px] right-12 md:right-6 flex flex-col gap-1 md:gap-2">
            {actions.map((item, index) => {
              return (
                <>
                  <Tooltip title={item.name} key={index} placement="left-start">
                    <IconButton sx={{ color: "white" }}>{item.icon}</IconButton>
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
          onClick={() => handleActive(0)}
        >
          <p
            className={` ${
              isActive === 0 ? "text-black" : "text-textLightColor"
            } text- text-[14px] font-semibold cursor-pointer md:block hidden`}
          >
            Thông tin cá nhân
          </p>
          <div className="md:hidden block">
            <AssignmentIndIcon
              className={`${
                isActive === 0 ? "text-black" : "text-textLightColor"
              } cursor-pointer`}
            />
          </div>
        </div>
        <div
          className="w-1/5 md:p-5 p-0 text-center flex justify-center items-center"
          onClick={() => handleActive(1)}
        >
          <p
            className={` ${
              isActive === 1 ? "text-black" : "text-textLightColor"
            } text- text-[14px] font-semibold cursor-pointer md:block hidden`}
          >
            Bài viết
          </p>
          <div className="md:hidden block">
            <FeedIcon
              className={`${
                isActive === 1 ? "text-black" : "text-textLightColor"
              } cursor-pointer`}
            />
          </div>
        </div>
        <div className="w-1/5 md:p-5 p-2 relative flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1708973908941-e043bdee8a88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
            className="md:w-[150px] md:h-[150px] w-[20vw] h-[20vw] absolute md:-top-[140px] -top-[19vw] object-cover object-center rounded-[100%] left-1/2 -translate-x-1/2 translate-x"
          />
          <p className="text-center md:text-[14px] text-[2vw] font-semibold whitespace-nowrap">
              {userDetail.fullname}
          </p>
        </div>
        <div
          className="w-1/5 md:p-5 p-0 text-center flex justify-center items-center"
          onClick={() => handleActive(2)}
        >
          <p
            className={` ${
              isActive === 2 ? "text-black" : "text-textLightColor"
            } text- text-[14px] font-semibold cursor-pointer md:block hidden`}
          >
            Bạn bè
          </p>
          <div className="md:hidden block">
            <PeopleIcon
              className={`${
                isActive === 2 ? "text-black" : "text-textLightColor"
              } cursor-pointer`}
            />
          </div>
        </div>
        <div
          className="w-1/5 md:p-5 p-0 text-center flex justify-center items-center"
          onClick={() => handleActive(3)}
        >
          <p
            className={` ${
              isActive === 3 ? "text-black" : "text-textLightColor"
            } text- text-[14px] font-semibold cursor-pointer md:block hidden`}
          >
            Ảnh
          </p>
          <div className="md:hidden block">
            <PhotoIcon
              className={`${
                isActive === 3 ? "text-black" : "text-textLightColor"
              } cursor-pointer`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
