/* eslint-disable react/prop-types */
import Textarea from "@mui/joy/Textarea";
import { Avatar, Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  CallApiDetailsListPosts,
  CallApiMyListPosts,
  CallApiPostId,
} from "../../store/postsSlice";
import axios from "axios";
const ReplyComment = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplay_2, setIsReplay_2] = useState(false);
  const [textEditComment, setTextEditComment] = useState(props.reply.content);
  const authToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsEditing(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const sendReplay = () => {
    setIsReplay_2((prevIsReplay_2) => !prevIsReplay_2);
    const newReplayStatus = !isReplay_2;

    props.isReplay(newReplayStatus);
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
      hour: "giờ",
      a: "Một",
      few: "vài",
      minute: "phút",
    };
    const vietnameseTimeIntervalString = time.replace(
      /\b\w+\b/g,
      (match) => translations[match] || match
    );
    return vietnameseTimeIntervalString;
  };
  const handleReplyComment = (commentId) => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/comments",
        {
          author: userDetail.id,
          post: props.comment.post.id,
          content: textComment,
          comment: commentId,
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (commentId) => {
    axios
      .delete(import.meta.env.VITE_APP_BASE_URL + "/comments/" + commentId, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdateComment = (commentId) => {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + `/comments/${commentId}`,
        {
          content: textEditComment,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setIsEditing(false);
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
        dispatch(
          CallApiPostId({
            headers: { authorization: `Bearer ${authToken}` },
            id: props.comment.post.id,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex gap-4 w-full">
      <Avatar alt="Remy Sharp" src={props.reply.author.image} />
      <div className="flex flex-col w-full gap-2">
        <h4 style={{ margin: 0, textAlign: "left", fontWeight: "500" }}>
          {props.reply.author.fullname}
        </h4>
        {isEditing ? (
          <Textarea
            placeholder="Viết bình luận ..."
            defaultValue={textEditComment}
            minRows={2}
            onChange={(e) => setTextEditComment(e.target.value)}
            className="outline-none text-justify"
            variant="soft"
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
                <span className="text-[12px]">
                  Nhấn ESC hoặc{" "}
                  <span
                    className="text-mainColor cursor-pointer"
                    onClick={() => setIsEditing(false)}
                  >
                    đây
                  </span>{" "}
                  để hủy thao tác.
                </span>
                <Button
                  sx={{ ml: "auto" }}
                  onClick={() => handleUpdateComment(props.reply.id)}
                >
                  <SendIcon />
                </Button>
              </Box>
            }
          />
        ) : (
          <Textarea
            defaultValue={props.reply.content}
            minRows={2}
            className="outline-none text-justify "
            variant="soft"
            disabled
            color="#fff"
          />
        )}
        <div className="flex items-center justify-start gap-3">
          <p
            style={{
              textAlign: "justify",
              color: "gray",
              fontSize: "14px",
            }}
          >
            {formatTime(moment(props.reply.createdAt).fromNow())}
          </p>
          <div className="flex gap-3">
            <span
              onClick={sendReplay}
              style={{
                color: "gray",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Phản hồi
            </span>
            <span
              onClick={() => setIsEditing(true)}
              style={{
                color: "gray",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Chỉnh sửa
            </span>
            <span
              style={{
                color: "gray",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(props.reply.id)}
            >
              Xóa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;
