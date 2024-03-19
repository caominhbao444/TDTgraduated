import {
  Avatar,
  Card,
  CardHeader,
  Dialog,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  MenuItem,
  Skeleton,
  Switch,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import PostContainer from "../HomeItems/PostContainer/PostContainer";
import { API_FACULTY, API_MESSAGES, API_POST } from "../../fakeApi";
import FriendCard from "../FriendItem/FriendCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CallApiDetailsListPosts } from "../../store/postsSlice";
import axios from "axios";
import { CallApiInforUser, CallApiUpdateUser } from "../../store/users2Slice";
import Swal from "sweetalert2";

const Body = (props) => {
  const [listCity, setListCity] = useState("");
  const [isEditFullName, setIsEditFullName] = useState(false);
  const [isEditUserName, setIsEditUserName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditGender, setIsEditGender] = useState(false);
  const [isEditCountry, setIsEditCountry] = useState(false);
  const [isEditCourse, setIsEditCourse] = useState(false);
  const [isEditFaculty, setIsEditFaculty] = useState(false);
  const [checked, setChecked] = useState(false);
  const authToken = localStorage.getItem("token");
  const { id } = useParams();
  const myDetailsPost = useSelector((state) => state.post.myDetailsPost);
  const userDetail = useSelector((state) => state.user.userDetail);
  const inforUser = useSelector((state) => state.user2.inforUser);
  const [fullname, setFullname] = useState(
    props.user.fullname ? props.user.fullname : inforUser.fullname
  );
  const [username, setUsername] = useState(
    props.user.username ? props.user.username : inforUser.username
  );
  const [email, setEmail] = useState(
    props.user.email ? props.user.email : inforUser.email
  );
  const [gender, setGender] = useState(
    props.user.gender ? props.user.gender : inforUser.gender
  );
  const [country, setCountry] = useState(
    props.user.country ? props.user.country : inforUser.country
  );
  const [course, setCourse] = useState(
    props.user.course ? props.user.course : inforUser.course
  );
  const [faculty, setFaculty] = useState(
    props.user.faculty ? props.user.faculty : inforUser.faculty
  );
  const dispatch = useDispatch();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const lengthOfCourse = currentYear - 1996;
  const listCourse = Array.from(
    { length: lengthOfCourse },
    (_, index) => index + 1
  );
  const navigate = useNavigate();
  const handleChange = () => {
    setChecked(!checked);
  };
  const handleNavigate = (id) => {
    navigate(`/post/${id}`);
  };
  useEffect(() => {
    axios
      .get(
        "https://vapi.vnappmob.com/api/province/?fbclid=IwAR29lW0N7ZKj5Bm2_Ih5cT6wzihhQFxCPMn20NTwGZkkYwbqTvfTN8o2tX8"
      )
      .then((response) => {
        setListCity(response.data.results);
      });
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(
        CallApiInforUser({
          headers: { authorization: `Bearer ${authToken}` },
          id: id,
        })
      );
    }
  }, [id, dispatch, authToken]);

  useEffect(() => {
    if (props.user) {
      dispatch(
        CallApiDetailsListPosts({
          headers: { authorization: `Bearer ${authToken}` },
          id: props.user.id,
        })
      );
    }
    console.log("Post", myDetailsPost);
  }, [props.user, dispatch, authToken]);
  console.log(props.user);
  const handleCancel = () => {
    setUsername(props.user.username);
    setFullname(props.user.fullname);
    setEmail(props.user.email);
    setGender(props.user.gender);
    setCountry(props.user.country);
    setFaculty(props.user.faculty);
    setCourse(props.user.course);
    setIsEditCountry(false);
    setIsEditCourse(false);
    setIsEditEmail(false);
    setIsEditFaculty(false);
    setIsEditFullName(false);
    setIsEditGender(false);
    setIsEditUserName(false);
  };
  const handleUpdateUser = () => {
    dispatch(
      CallApiUpdateUser({
        headers: { authorization: `Bearer ${authToken}` },
        userId: props.user.id,
        data: {
          username: username,
          fullname: fullname,
          email: email,
          gender: gender,
          country: country,
          faculty: faculty,
          course: course,
        },
      })
    )
      .then((res) => {
        setIsEditCountry(false);
        setIsEditCourse(false);
        setIsEditEmail(false);
        setIsEditFaculty(false);
        setIsEditFullName(false);
        setIsEditGender(false);
        setIsEditUserName(false);
        Swal.fire({
          title: "Thành công",
          text: "Cập nhật thông tin thành công",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          dispatch(
            CallApiInforUser({
              headers: { authorization: `Bearer ${authToken}` },
              id: id,
            })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" bg-white w-full flex justify-center items-start">
      {props.activeTab === 0 && (
        <div className="flex flex-col w-full md:w-2/3 p-5 md:gap-3 gap-1">
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Họ và tên
            </div>
            <div className="w-1/2 flex justify-between items-center">
              {isEditFullName ? (
                <input
                  className="w-2/3 p-1 outline-none border text-[2vw] md:text-[15px]"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              ) : (
                <span className="text-[2vw] md:text-[15px] font-normal">
                  {props.user.fullname
                    ? props.user.fullname
                    : inforUser.fullname}
                </span>
              )}
              {userDetail.id === props.user.id && (
                <div onClick={() => setIsEditFullName(!isEditFullName)}>
                  <EditIcon className="h-full w-full cursor-pointer" />
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Tên đăng nhập
            </div>
            <div className="w-1/2 flex justify-between items-center">
              {isEditUserName ? (
                <input
                  className="w-2/3 p-1 outline-none border text-[2vw] md:text-[15px]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <span className="text-[2vw] md:text-[15px] font-normal">
                  {props.user.username
                    ? props.user.username
                    : inforUser.username}
                </span>
              )}
              {userDetail.id === props.user.id && (
                <div onClick={() => setIsEditUserName(!isEditUserName)}>
                  <EditIcon className="h-full w-full cursor-pointer" />
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Email
            </div>
            <div className="w-1/2 flex justify-between items-center">
              {isEditEmail ? (
                <input
                  className="w-2/3 p-1 outline-none border text-[2vw] md:text-[15px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <span className="text-[2vw] md:text-[15px] font-normal">
                  {props.user.email ? props.user.email : inforUser.email}
                </span>
              )}
              {userDetail.id === props.user.id && (
                <div onClick={() => setIsEditEmail(!isEditEmail)}>
                  <EditIcon className="h-full w-full cursor-pointer" />
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Giới tính
            </div>
            <div className="w-1/2 flex justify-between items-center">
              {isEditGender ? (
                <TextField
                  className="w-2/3"
                  id="gender"
                  name="gender"
                  autoComplete="off"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  select
                >
                  <MenuItem value="Nam">Nam</MenuItem>
                  <MenuItem value="Nữ">Nữ</MenuItem>
                </TextField>
              ) : (
                <span className="text-[2vw] md:text-[15px] font-normal">
                  {props.user.email ? props.user.gender : inforUser.gender}
                </span>
              )}
              {userDetail.id === props.user.id && (
                <div onClick={() => setIsEditGender(!isEditGender)}>
                  <EditIcon className="h-full w-full cursor-pointer" />
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Quê quán
            </div>
            <div className="w-1/2 flex justify-between items-center">
              {isEditCountry ? (
                <TextField
                  className="w-2/3"
                  id="country"
                  name="country"
                  autoComplete="off"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  select
                >
                  {listCity ? (
                    listCity.map((city) => {
                      return (
                        <MenuItem
                          value={city.province_name}
                          key={city.province_id}
                        >
                          {city.province_name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value="" disabled>
                      Đang tải danh sách thành phố.
                    </MenuItem>
                  )}
                </TextField>
              ) : (
                <span className="text-[2vw] md:text-[15px] font-normal">
                  {props.user.country ? props.user.country : inforUser.country}
                </span>
              )}
              {userDetail.id === props.user.id && (
                <div onClick={() => setIsEditCountry(!isEditCountry)}>
                  <EditIcon className="h-full w-full cursor-pointer" />
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Khoa
            </div>
            <div className="w-1/2 flex justify-between items-center">
              {isEditFaculty ? (
                <TextField
                  className="w-2/3"
                  id="country"
                  name="country"
                  autoComplete="off"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  select
                >
                  {API_FACULTY.map((item) => {
                    return (
                      <MenuItem value={item.name} key={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              ) : (
                <span className="text-[2vw] md:text-[15px] font-normal">
                  {props.user.faculty ? props.user.faculty : inforUser.faculty}
                </span>
              )}
              {userDetail.id === props.user.id && (
                <div onClick={() => setIsEditFaculty(!isEditFaculty)}>
                  <EditIcon className="h-full w-full cursor-pointer" />
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 md:text-[15px] text-textLightColor font-medium text-[2vw]">
              Khóa
            </div>
            <div className="w-1/2 flex justify-between items-center">
              {isEditCourse ? (
                <TextField
                  className="w-2/3"
                  id="course"
                  name="course"
                  autoComplete="off"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  select
                >
                  {listCourse.map((course) => {
                    return (
                      <MenuItem value={course} key={course}>
                        Khoá {course}
                      </MenuItem>
                    );
                  })}
                </TextField>
              ) : (
                <span className="text-[2vw] md:text-[15px] font-normal">
                  {props.user.course ? props.user.course : inforUser.course}
                </span>
              )}
              {userDetail.id === props.user.id && (
                <div onClick={() => setIsEditCourse(!isEditCourse)}>
                  <EditIcon className="h-full w-full cursor-pointer" />
                </div>
              )}
            </div>
          </div>
          {userDetail.id === props.user.id && (
            <div className="flex justify-end items-center w-full">
              <div className="flex gap-2">
                <div
                  className="px-3 py-1 border cursor-pointer rounded-sm"
                  onClick={handleCancel}
                >
                  Hủy
                </div>
                <div
                  className="px-3 py-1 border cursor-pointer bg-mainColor rounded-sm text-white"
                  onClick={handleUpdateUser}
                >
                  Cập nhật
                </div>
              </div>
            </div>
          )}
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
              {/* <div className="flex gap-1 items-center">
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <span className="text-[14px] font-semibold">
                  Xếp theo thời gian
                </span>
              </div> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              {props.user.friends
                ? props.user.friends.map((friend) => {
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
