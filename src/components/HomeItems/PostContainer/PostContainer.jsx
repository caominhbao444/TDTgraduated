/* eslint-disable react/prop-types */
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Dialog,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
  CircularProgress,
  DialogTitle,
  ListItemIcon,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import moment from "moment";
import "moment/locale/vi";
import Comment from "../../Comment/Comment";
import Textarea from "@mui/joy/Textarea";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";
import MoodIcon from "@mui/icons-material/Mood";
import { useDispatch, useSelector } from "react-redux";
import {
  CallApiDetailsListPosts,
  CallApiMyListPosts,
} from "../../../store/postsSlice";

const listComment = [
  {
    id: 1,
    id_comment: 10,
    name: "Cao Minh Bao",
    content: "Hom nay la thu 2",
    dateCreate: 1,
  },
  {
    id: 2,
    id_comment: 11,
    name: "Cao Minh Bao2",
    content: "Hom nay la thu 3",
    dateCreate: 1,
  },
];
const PostContainer = (props) => {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("token");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { loading = false } = props;
  const [componentLoading, setComponentLoading] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const [content, setContent] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const userDetail = useSelector((state) => state.user.userDetail);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEditPost(false);
  };
  const handleOpenEditPost = (post) => {
    setOpenEditPost(true);
    setContent(post.content);
    setIsPublic(post.isPublic | true);
    if (post.media) {
      setImageUrl(post.media);
    }
  };
  const onEmojiClick = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setTextComment(textComment + emoji);
  };
  const formatTime = (time) => {
    const translations = {
      years: "năm",
      months: "tháng",
      weeks: "tuần",
      days: "ngày",
      hours: "giờ",
      minutes: "phút",
      seconds: "giây",
      milliseconds: "mili giây",
      ago: "trước",
      an: "Một",
      a: "Một",
      day: "ngày",
      hour: "giờ",
      few: "vài",
      minute: "phút",
    };
    const vietnameseTimeIntervalString = time.replace(
      /\b\w+\b/g,
      (match) => translations[match] || match
    );
    return vietnameseTimeIntervalString;
  };
  console.log(userDetail);
  function editPost() {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + "/posts/" + props.post.id,
        {
          content: content,
          media: imageUrl,
          isPublic: isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "Thành công",
          text: "Bài viết đã được cập thành công.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          dispatch(
            CallApiMyListPosts({
              headers: { authorization: `Bearer ${authToken}` },
              id: userDetail.id,
            })
          );
          dispatch(
            CallApiDetailsListPosts({
              headers: { authorization: `Bearer ${authToken}` },
              id: userDetail.id,
            })
          );
        });
        setOpenEditPost(false);
        setIsEdit(!isEdit);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function deletePost() {
    axios
      .delete(import.meta.env.VITE_APP_BASE_URL + "/posts/" + props.post.id, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Thành công",
          text: "Xóa bài viết cập thành công.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          dispatch(
            CallApiMyListPosts({
              headers: { authorization: `Bearer ${authToken}` },
              id: userDetail.id,
            })
          );
          dispatch(
            CallApiDetailsListPosts({
              headers: { authorization: `Bearer ${authToken}` },
              id: userDetail.id,
            })
          );
        });
        setOpenEditPost(false);
        setIsEdit(!isEdit);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleFileChange(event) {
    setEditLoading(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setEditLoading(false);
        setImageUrl(url);
      })
      .catch((error) => {
        setEditLoading(false);
        console.error(error);
      });
  }
  function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pzoe2lzh");
    return axios
      .post("https://api.cloudinary.com/v1_1/djhhzmcps/image/upload", formData)
      .then((response) => {
        return response.data.url;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
  const onLiked = (postId) => {
    setComponentLoading(true);
    const likedList = props.post.liked.map((el) => {
      return el.id;
    });
    const index = likedList.indexOf(userDetail.id);
    if (index > -1) {
      likedList.splice(index, 1);
    } else {
      likedList.push(userDetail.id);
    }
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + "/posts/" + postId,
        {
          liked: likedList,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch(
          CallApiMyListPosts({
            headers: { authorization: `Bearer ${authToken}` },
            id: userDetail.id,
          })
        );
        dispatch(
          CallApiDetailsListPosts({
            headers: { authorization: `Bearer ${authToken}` },
            id: userDetail.id,
          })
        );
        setComponentLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleComment = () => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/comments",
        {
          author: userDetail.id,
          post: props.post.id,
          content: textComment,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setTextComment("");
        dispatch(
          CallApiMyListPosts({
            headers: { authorization: `Bearer ${authToken}` },
            id: userDetail.id,
          })
        );
        dispatch(
          CallApiDetailsListPosts({
            headers: { authorization: `Bearer ${authToken}` },
            id: userDetail.id,
          })
        );
        setComponentLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card className="w-full ">
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <Avatar
                alt="Ted talk"
                src={props.post.author.image ? props.post.author.image : ""}
              />
            )
          }
          action={
            loading ? null : (
              <>
                {userDetail.id === props.post.author.id && (
                  <IconButton
                    aria-label="settings"
                    className="relative"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    <MoreVertOutlinedIcon />
                    {isEdit && (
                      <div className="absolute top-[110%] right-0 text-center w-[100px] border bg-white border-textLightColor flex flex-col">
                        <div
                          className="w-full py-2 text-[14px]"
                          onClick={() => handleOpenEditPost(props.post)}
                        >
                          Chỉnh sửa
                        </div>
                        <Divider />
                        <div
                          onClick={() => deletePost(props.post.id)}
                          className="w-full py-2 text-[14px]"
                        >
                          Xóa
                        </div>
                      </div>
                    )}
                  </IconButton>
                )}
              </>
            )
          }
          title={props.post.author.fullname}
          subheader={`${formatTime(
            moment(props.post.createdAt).locale("vi").fromNow()
          )}`}
        />
        {props.post.media ? (
          <CardMedia
            component="img"
            className="h-[200px] md:h-[400px] object-cover"
            image={props.post.media}
            alt="Paella dish"
          />
        ) : null}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.post.content}
          </Typography>
        </CardContent>
        <div className="px-4 flex justify-between items-center w-full">
          <div className="flex items-center gap-1">
            <ThumbUpIcon
              className={
                props.post.liked.filter((el) => el.id == userDetail.id).length >
                0
                  ? "text-mainColor"
                  : "text-gray-200"
              }
            />
            <AvatarGroup
              componentsProps={{
                additionalAvatar: {
                  sx: {
                    height: 20,
                    width: 20,
                    background: "red",
                    fontSize: 10,
                    marginLeft: 20,
                  },
                },
              }}
              spacing={"medium"}
              max={2}
            >
              {props.post.liked
                ? props.post.liked.map((el) => (
                    <Avatar
                      key={el.id}
                      sx={{ width: 20, height: 20, fontSize: 10 }}
                      alt="Remy Sharp"
                      src={el.image}
                    />
                  ))
                : null}
            </AvatarGroup>
          </div>
          <div className="flex items-center">
            <span>{props.post.comments.length}</span>
            <span className="ml-1">Bình luận</span>
          </div>
        </div>

        <CardActions className="flex justify-between w-full p-0 border mt-4">
          <button
            className="w-1/2 flex justify-center items-center gap-3 md:py-1"
            onClick={() => onLiked(props.post.id)}
          >
            <ThumbUpIcon
              className={
                props.post.liked.filter((el) => el.id == userDetail.id).length >
                0
                  ? "text-mainColor"
                  : "text-gray-200 "
              }
              fontSize="small"
            />
            <span className="font-medium text-[12px] md:text-[15px]">
              Thích
            </span>
          </button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <button
            className="w-1/2 flex justify-center items-center gap-3 md:py-1"
            onClick={handleExpandClick}
          >
            <ModeCommentIcon
              className="text-textLightColor "
              fontSize="small"
            />
            <span className="font-medium text-[12px] md:text-[15px]">
              Bình luận
            </span>
          </button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {props.post.comments &&
            props.post.comments.filter(el => !el.comment).map((comment) => {
              return (
                <>
                  <Comment
                    key={comment.id}
                    name={comment.name}
                    content={comment.content}
                    dateCreate={comment.dateCreate}
                    id={comment.id}
                    comment={comment}
                    authorPost={props.post.author.id}
                  />
                </>
              );
            })}
          <CardContent>
            <div className="flex gap-4 w-full">
              <Avatar alt="Remy Sharp" src={userDetail.image} />
              <div className="flex flex-col w-full gap-2">
                <Textarea
                  placeholder="Viết bình luận…"
                  minRows={1}
                  className="outline-none text-justify"
                  variant="soft"
                  value={textComment}
                  onChange={(e) => setTextComment(e.target.value)}
                  endDecorator={
                    <Box
                      sx={{
                        display: "flex",
                        gap: "var(--Textarea-paddingBlock)",
                        pt: "var(--Textarea-paddingBlock)",
                        borderTop: "1px solid",
                        borderColor: "divider",
                        flex: "auto",
                      }}
                    >
                      <Button onClick={() => setOpen(!open)}>
                        <MoodIcon />
                      </Button>
                      <Button
                        sx={{ ml: "auto" }}
                        onClick={() => handleComment()}
                      >
                        <SendIcon />
                      </Button>
                    </Box>
                  }
                />
              </div>
            </div>
          </CardContent>
        </Collapse>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <EmojiPicker
          skinTonesDisabled={true}
          searchDisabled={true}
          previewConfig={{ showPreview: false }}
          size="16"
          onEmojiClick={onEmojiClick}
        />
      </Dialog>

      <Dialog open={openEditPost} onClose={handleCloseEdit}>
        <DialogTitle style={{ backgroundColor: "#1877f2" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <span style={{ fontWeight: "bold", color: "white" }}>
              Sửa bài viết
            </span>
            <CloseOutlinedIcon
              name="close-circle-outline"
              onClick={handleCloseEdit}
              className="w-[30px] h-[30px] block cursor-pointer border-none z-10 text-white"
            />
          </Box>
        </DialogTitle>
        <div className="flex flex-col md:justify-around relative p-[20px] max-w-[600px] md:h-[400px] gap-[10px]">
          <Box
            maxWidth="600px"
            className="flex flex-col md:flex-row gap-[10px] relative"
          >
            <div className="max-w-[300px] md:w-[300px] relative">
              {editLoading ? (
                <>
                  <img
                    src={imageUrl}
                    width="100%"
                    alt="bag photos?"
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Switch
              value={isPublic}
              onClick={() => setIsPublic(!isPublic)}
            ></Switch>
          </Box>
          <Button
            onClick={() => editPost()}
            variant="contained"
            style={{
              backgroundColor: "#1877f2",
              borderRadius: "0",
              fontWeight: "bold",
            }}
            fullWidth
          >
            Sửa bài
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default PostContainer;
