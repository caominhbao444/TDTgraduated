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
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
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
import { useSelector } from "react-redux";

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
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { loading = false } = props;
  const userDetail = useSelector((state) => state.user.userDetail);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClose = () => {
    setOpen(false);
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
      hour: "giờ",
    };
    const vietnameseTimeIntervalString = time.replace(
      /\b\w+\b/g,
      (match) => translations[match] || match
    );
    return vietnameseTimeIntervalString;
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
              <Avatar alt="Ted talk" src={props.post.author.image} />
            )
          }
          action={
            loading ? null : (
              <IconButton aria-label="settings" className="relative">
                <MoreVertOutlinedIcon onClick={() => setIsEdit(!isEdit)} />
                {isEdit && (
                  <div className="absolute top-[110%] right-0 text-center w-[100px] border bg-white border-textLightColor flex flex-col">
                    <div
                      className="w-full py-2 text-[14px]"
                      onClick={() => alert("hi")}
                    >
                      Chỉnh sửa
                    </div>
                    <Divider />
                    <div className="w-full py-2 text-[14px]">Xóa</div>
                  </div>
                )}
              </IconButton>
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
                props.post.id === userDetail.id
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
          <button className="w-1/2 flex justify-center items-center gap-3 md:py-1">
            <ThumbUpIcon className="text-textLightColor " fontSize="small" />
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
          {listComment &&
            listComment.map((comment, index) => {
              return (
                <Comment
                  key={index}
                  name={comment.name}
                  content={comment.content}
                  dateCreate={comment.dateCreate}
                  id={comment.id}
                />
              );
            })}
          <CardContent>
            <div className="flex gap-4 w-full">
              <Avatar
                alt="Remy Sharp"
                src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              />
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
                      <Button sx={{ ml: "auto" }}>
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
    </>
  );
};

export default PostContainer;
