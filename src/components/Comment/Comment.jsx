/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CardContent,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import SendIcon from "@mui/icons-material/Send";
import ReplyComment from "../ReplyComment/ReplyComment";
import Chip from "@mui/material/Chip";
import ReactDOMServer from "react-dom/server";
import moment from "moment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CallApiMyListPosts, CallApiPostId } from "../../store/postsSlice";

const listReply = [
  { id: 1, id_comment: 1, name: "Duy", content: "Chao Bao", dateCreate: 1 },
  { id: 2, id_comment: 2, name: "Duy", content: "Chao Duy", dateCreate: 1 },
  {
    id: 3,
    id_comment: 1,
    name: "Duy Bao",
    content: "Chao Bao 2",
    dateCreate: 1,
  },
];
const Comment = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [textEditComment, setTextEditComment] = useState(props.comment.content);
  const authToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsEditing(false);
        setIsReplay(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
  const handleReplay = (isReplay) => {
    setIsReplay(isReplay);
  };
  const userDetail = useSelector((state) => state.user.userDetail);

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
  console.log(props.comment);
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
        setTextComment("");
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
  const handleUpdateComment = (commentId) => {};
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <CardContent className="flex">
      <div className="flex gap-4 w-full">
        <Avatar
          alt="Remy Sharp"
          src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        />
        <div className="flex flex-col w-full gap-2">
          <h4 style={{ margin: 0, textAlign: "left", fontWeight: "500" }}>
            {props.comment.author.fullname}
          </h4>
          {isEditing ? (
            <Textarea
              placeholder="Viết bình luận…"
              value={textEditComment}
              onChange={(e) => setTextEditComment(e.target.value)}
              minRows={2}
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
                  <Button sx={{ ml: "auto" }}>
                    <SendIcon />
                  </Button>
                </Box>
              }
            />
          ) : (
            <Textarea
              defaultValue={props.comment.content}
              minRows={2}
              className="outline-none text-justify "
              variant="soft"
              disabled
              color="#fff"
            />
          )}
          <div className="flex items-center justify-start gap-3">
            <p
              style={{ textAlign: "justify", color: "gray", fontSize: "14px" }}
            >
              {formatTime(moment(props.comment.createdAt).fromNow())}
            </p>
            <div className="flex gap-3">
              <span
                onClick={() => setIsReplay(!isReplay)}
                style={{
                  color: "gray",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Phản hồi
              </span>
              {userDetail.id !== props.comment.author.id ? (
                <></>
              ) : (
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
              )}
              {userDetail.id === props.comment.author.id ||
              props.authorPost === userDetail.id ? (
                <span
                  style={{
                    color: "gray",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(props.comment.id)}
                >
                  Xóa
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>

          {props.comment.replies &&
            props.comment.replies.map((reply, index) => {
              if (reply.comment.id === props.id) {
                return (
                  <ReplyComment
                    key={index}
                    name={reply.name}
                    content={reply.content}
                    dateCreate={reply.dateCreate}
                    isReplay={handleReplay}
                    reply={reply}
                  />
                );
              }
            })}
          {isReplay && (
            <div className="flex gap-4 w-full">
              <Avatar
                alt="Remy Sharp"
                src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              />
              <div className="flex flex-col w-full gap-2">
                <h4 style={{ margin: 0, textAlign: "left", fontWeight: "500" }}>
                  {userDetail.fullname}
                </h4>

                <Textarea
                  placeholder="Viết bình luận 1…"
                  minRows={2}
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
                      <span className="text-[12px]">
                        Nhấn ESC để hủy thao tác.
                      </span>
                      <Button
                        sx={{ ml: "auto" }}
                        onClick={() => handleReplyComment(props.comment.id)}
                      >
                        <SendIcon />
                      </Button>
                    </Box>
                  }
                ></Textarea>
              </div>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  );
};

export default Comment;
