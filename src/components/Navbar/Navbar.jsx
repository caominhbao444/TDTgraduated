import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import {
  Lock,
  Logout,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../store/usersSlice";
import { resetStateToInitial } from "../../store/postsSlice";
import {
  CallApiCheckRole,
  CallApiListAllFriends,
  resetUserStateToInitial,
} from "../../store/users2Slice";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object({
  password: yup
    .string("Vui lòng nhập mật khẩu.")
    .min(8, "Mật khẩu phải chứa ít nhất 8 kí tự.")
    .matches(/^(?=.*[a-z])/, "Mật khẩu phải chứa 1 kí tự viết thường.")
    .matches(/^(?=.*[A-Z])/, "Mật khẩu phải chứa 1 kí tự viết hoa.")
    .matches(/^(?=.*[0-9])/, "Mật khẩu phải chứa 1 chữ số")
    .required("Vui lòng nhập trường này."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu phải khớp"),
});
const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [openChange, setOpenChange] = React.useState(false);
  const userDetail = useSelector((state) => state.user.userDetail);
  const listAllFriends = useSelector((state) => state.user2.listAllFriends);
  const checkRole = useSelector((state) => state.user2.checkRole);
  const [isLoadingListFriends, setIsLoadingListFriends] = useState(true);

  const [data, setData] = useState({
    id: userDetail.id,
    password: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [openListName, setOpenListName] = useState(false);
  const [Urlimg, setUrlimg] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const [imageUrl, setImageUrl] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const formData = {
      id: userDetail.id,
      password: data.password,
    };
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + `/reset-password`, formData)
      .then(() => {
        setOpenChange(false);
        Swal.fire({
          title: "Thành công",
          text: "Cập nhật mật khẩu thành công.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((res) => {
          console.log("Message", res);
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Thất bại",
          text: "Cập nhật mật khẩu thất bại.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: data,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  useEffect(() => {
    if (authToken) {
      dispatch(
        CallApiListAllFriends({
          headers: { authorization: `Bearer ${authToken}` },
        })
      ).then(() => {
        setIsLoadingListFriends(false);
        setFilteredData(listAllFriends);
      });
    }
  }, [dispatch, authToken]);
  useEffect(() => {
    if (authToken) {
      dispatch(
        CallApiCheckRole({
          headers: { authorization: `Bearer ${authToken}` },
        })
      );
    }
  }, [authToken]);
  const handleSearchName = (e) => {
    const { value } = e.target;
    setSearchName(value);
    setOpenListName(value.trim().length > 0);
    filterData(e.target.value);
  };
  const filterData = (input) => {
    const filtered = listAllFriends.filter((item) =>
      item.fullname.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // navigate("/");
  };
  const handleCloseChange = () => {
    setAnchorEl(null);
    // navigate("/");
  };
  const handleChangePassword = () => {
    setOpenChange(true);
  };

  const handleLogout = async () => {
    await axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + "/auth/logout/" + userDetail.id,
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        dispatch(setLogout());
        dispatch(resetStateToInitial());
        dispatch(resetUserStateToInitial());
        navigate("/");
      });
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Đăng bài", "Trang chủ", "Bạn bè", "Sự kiện", "Cộng đồng"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                // onClick={index === 0 && handleOpenPost}
                onClick={() => {
                  switch (index) {
                    case 0:
                      handleOpenPost();
                      break;
                    case 1:
                      navigate("/home");
                      break;
                    case 2:
                      navigate("/friends");
                      break;
                    default:
                    // Xử lý trường hợp mặc định (nếu cần)
                  }
                }}
              >
                <ListItemIcon>
                  {index === 0 && <CreateOutlinedIcon />}
                  {index === 1 && <HomeOutlinedIcon />}
                  {index === 2 && <GroupOutlinedIcon />}
                  {index === 3 && <CalendarMonthOutlinedIcon />}
                  {index === 4 && <GroupsOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  const handleOpenPost = () => {
    setOpenDialog(true);
  };
  function handleFileChange(event) {
    setLoading(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setLoading(false);
        setImageUrl(url);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }
  function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pzoe2lzh"); // replace with your Cloudinary upload preset

    return axios
      .post("https://api.cloudinary.com/v1_1/djhhzmcps/image/upload", formData)
      .then((response) => {
        setUrlimg(response.data.url);
        return response.data.url; // return the URL of the uploaded image
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (
      imageUrl !==
        "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6" ||
      content
    ) {
      Swal.fire({
        title: "Bỏ bài viết?",
        text: "Nếu rời đi, bạn sẽ mất những gì vừa chỉnh sửa.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Bỏ!",
        cancelButtonText: "Tiếp tục",
      }).then((result) => {
        if (result.isConfirmed) {
          setOpenDialog(false);
          setImageUrl(
            "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
          );
          setContent(""); // clear the content state
          Swal.fire("Bỏ", "Bài viết nháp đã được xóa.", "success");
        } else {
          setOpenDialog(true);
        }
      });
    }
  };
  const handleCreatePost = () => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + `/post`, {
        author: 1,
        media: Urlimg,
        content: content,
      })
      .then((res) => {
        // navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDetail = () => {
    // setAnchorEl(null);
    navigate(`/detail/${userDetail.id}`);
  };
  useEffect(() => {
    console.log("check admin", userDetail.role);
  }, []);
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center mx-4 md:mx-5 md:py-2 relative">
        <div className="flex md:gap-3 items-center">
          <div className="block md:hidden mr-4">
            <MenuIcon onClick={toggleDrawer("left", true)}></MenuIcon>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </div>
          <Link
            to="/home"
            className="font-bold text-[16px] md:mr-4 md:text-[20px] text-mainColor no-underline "
          >
            ALUMNI
          </Link>
          <div className="hidden md:block relative">
            <TextField
              id="search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
              autoComplete="off"
              value={searchName}
              onChange={handleSearchName}
            />
            {openListName && (
              <div className="absolute top-[40px] left-0 right-0 w-full max-h-[171px] overflow-y-auto flex flex-col z-50 bg-orange-200">
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <div
                      key={item.id} // Assuming item has an 'id' property for a unique key
                      className="w-full flex justify-between items-center p-3 cursor-pointer bg-white border hover:bg-slate-50"
                      onClick={() => {
                        navigate(`/detail/${item.id}`);
                        setSearchName("");
                        setOpenListName(false);
                      }}
                    >
                      <div className="flex justify-start items-center gap-2">
                        <Avatar
                          src={item.image}
                          sx={{ width: 32, height: 32 }}
                        ></Avatar>
                        <span className="text-[13px] font-medium">
                          {item.fullname}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full flex justify-center items-center p-3 cursor-pointer bg-white border">
                    Không có dữ liệu
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 justify-center items-center">
          {/* <Badge color="secondary" variant="dot">
            <MailOutlinedIcon
              size="small"
              className="cursor-pointer"
              onClick={() => navigate(`/message`)}
            />
          </Badge> */}
          <Badge color="secondary" variant="dot">
            <NotificationsNoneIcon size="small" />
          </Badge>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={userDetail.image}
              sx={{ width: 32, height: 32 }}
            ></Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleDetail}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Trang cá nhân
            </MenuItem>
            {checkRole && checkRole.id === 3 && (
              <MenuItem onClick={() => navigate("/admin/users")}>
                <ListItemIcon>
                  <ManageAccountsIcon fontSize="small" />
                </ListItemIcon>
                Quản lý người dùng
              </MenuItem>
            )}
            <MenuItem onClick={handleChangePassword}>
              <ListItemIcon>
                <Lock fontSize="small" />
              </ListItemIcon>
              Đổi mật khẩu
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: "#1877f2" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <span style={{ fontWeight: "bold", color: "white" }}>
              Tạo bài viết
            </span>
            <CloseOutlinedIcon
              name="close-circle-outline"
              onClick={handleCloseDialog}
              className="w-[30px] h-[30px] block cursor-pointer border-none z-10 text-white"
            />
          </Box>
        </DialogTitle>
        <div className="flex flex-col md:justify-around relative p-[20px] max-w-[600px] md:h-[400px] gap-[10px]">
          <Box
            maxWidth="600px"
            className="flex flex-col md:flex-row gap-[10px] relative"
          >
            <div className="max-w-[300px] w-[400px] md:w-[300px] relative">
              {loading ? (
                <>
                  <img
                    src={imageUrl}
                    width="100%"
                    alt="bag photos"
                    style={{
                      display: "block",
                      height: "253px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <CircularProgress />
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={imageUrl}
                    width="100%"
                    alt="bag photos"
                    style={{
                      display: "block",
                      height: "253px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  <input
                    onChange={handleFileChange}
                    type="file"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      opacity: "0",
                      cursor: "pointer",
                    }}
                  />
                </>
              )}
            </div>
            <textarea
              aria-label="empty textarea"
              placeholder="Bạn đang nghĩ gì..."
              className="max-w-[300px] w-[400px] md:w-[300px] min-h-[100px] md:h-[253px] h-[100px] border-none resize-none outline-none overflow-hidden"
              // style={{
              //   width: "300px",
              //   height: "253px", // change this to a smaller value
              //   minHeight: "100px", // set a smaller minHeight value
              //   border: "none",
              //   resize: "none",
              //   outline: "none",
              //   overflowY: "scroll",
              //   overflow: "hidden",
              // }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>
          <Button
            onClick={handleCreatePost}
            variant="contained"
            style={{
              backgroundColor: "#1877f2",
              borderRadius: "0",
              fontWeight: "bold",
            }}
            fullWidth
          >
            Đăng bài
          </Button>
        </div>
      </Dialog>
      <Dialog open={openChange} onClose={() => setOpenChange(false)}>
        <DialogTitle style={{ backgroundColor: "#1877f2" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <span style={{ fontWeight: "bold", color: "white" }}>
              Thay đổi mật khẩu
            </span>
            <CloseOutlinedIcon
              name="close-circle-outline"
              onClick={() => setOpenChange(false)}
              className="w-[30px] h-[30px] block cursor-pointer border-none z-10 text-white"
            />
          </Box>
        </DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col md:justify-around relative p-[20px] gap-[10px]"
        >
          <div className="w-full flex flex-col gap-1">
            <TextField
              label="Mật khẩu mới"
              id="password"
              variant="filled"
              size="small"
              className="w-full"
              autoComplete="off"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <TextField
              label="Nhập lại mật khẩu mới"
              id="confirmPassword"
              variant="filled"
              size="small"
              className="w-full"
              autoComplete="off"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#1877f2",
              borderRadius: "0",
              fontWeight: "bold",
            }}
            fullWidth
          >
            Cập nhật mật khẩu
          </Button>
        </form>
      </Dialog>
    </nav>
  );
};

export default Navbar;
