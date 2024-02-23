import Divider from "@mui/material/Divider";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_POST } from "../../fakeApi";
import PostContainer from "../../components/HomeItems/PostContainer/PostContainer";
import FirstAside from "../../components/HomeItems/FirstAside/FirstAside";
import SecondAside from "../../components/HomeItems/SecondAside/SecondAside";
import { useNavigate } from "react-router-dom";
const style = {
  py: 0,
  width: "100%",
};
const Home = () => {
  const [open, setOpen] = useState(false);
  const [Urlimg, setUrlimg] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const [imageUrl, setImageUrl] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleOpenPost = () => {
    setOpen(true);
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

  const handleClose = () => {
    setOpen(false);
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
          setOpen(false);
          setImageUrl(
            "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
          );
          setContent(""); // clear the content state
          Swal.fire("Bỏ", "Bài viết nháp đã được xóa.", "success");
        } else {
          setOpen(true);
        }
      });
    }
  };
  const handleCreatePost = () => {
    console.log(imageUrl);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 md:gap-8 min-h-screen bg-[#f7f7f7] ">
      <aside className="hidden md:flex md:flex-col justify-start items-center bg-white  md:col-span-2  sticky top-[58px] h-[calc(100vh-58px)] ">
        <List sx={style}>
          <ListItem className="hover:cursor-pointer" onClick={handleOpenPost}>
            <ListItemIcon className="flex justify-center">
              <CreateOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng bài" />
          </ListItem>
          <Divider component="li" />
          <ListItem className="hover:cursor-pointer">
            <ListItemIcon className="flex justify-center">
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Trang chủ" />
          </ListItem>
          <Divider component="li" />
          <ListItem
            className="hover:cursor-pointer"
            onClick={() => navigate("/friends")}
          >
            <ListItemIcon className="flex justify-center">
              <GroupOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Bạn bè" />
          </ListItem>
          <Divider component="li" />
          <ListItem className="hover:cursor-pointer">
            <ListItemIcon className="flex justify-center">
              <CalendarMonthOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Sự kiện" />
          </ListItem>
          <Divider component="li" />
          <ListItem className="hover:cursor-pointer">
            <ListItemIcon className="flex justify-center">
              <GroupsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Cộng đồng" />
          </ListItem>
          <Divider component="li" />
        </List>
      </aside>
      <main className="md:col-span-5 flex flex-col md:gap-8 gap-4 md:py-4 mt-[42px] md:mt-[58px]">
        {API_POST &&
          API_POST.map((post, index) => {
            return (
              <PostContainer
                key={index}
                name={post.user.name}
                user_avatar={post.user.image_avatar}
                image={post.image}
                content={post.content}
                dateCreated={post.dateCreated}
              />
            );
          })}
      </main>
      <aside className="bg-white md:col-span-2 hidden md:flex flex-col  sticky top-[58px]  h-[calc(100vh-58px)]">
        <SecondAside />
      </aside>
      <Dialog open={open} onClose={handleClose}>
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
              onClick={handleClose}
              className="w-[30px] h-[30px] block cursor-pointer border-none z-10 text-white"
            />
          </Box>
        </DialogTitle>
        <div
          className="flex flex-col md:justify-around relative p-[20px] max-w-[600px] md:h-[400px] gap-[10px]"
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: "space-around",
          //   position: "relative",
          //   padding: "40px",
          //   maxWidth: "600px",
          //   height: "400px",
          //   gap: "10px",
          // }}
        >
          <Box
            maxWidth="600px"
            className="flex flex-col md:flex-row gap-[10px] relative"
          >
            <div className="max-w-[300px] md:w-[300px] relative">
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
              className="max-w-[300px] md:w-[300px] min-h-[100px] md:h-[253px] h-[100px] border-none resize-none outline-none overflow-hidden"
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
    </div>
  );
};

export default Home;
