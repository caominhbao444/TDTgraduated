/* eslint-disable react/prop-types */
import { Avatar, Box, Button, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import SendIcon from "@mui/icons-material/Send";
import ReplyComment from "../ReplyComment/ReplyComment";
const listReply = [
  { id: 1, id_comment: 1, name: "Duy", content: "Chao Bao", dateCreate: 1 },
  { id: 2, id_comment: 2, name: "Duy", content: "Chao Duy", dateCreate: 1 },
];
const Comment = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [isReplay_2, setIsReplay_2] = useState(false);
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
  return (
    <CardContent className="bg-orange-300 flex">
      <div className="flex gap-4 w-full">
        <Avatar
          alt="Remy Sharp"
          src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        />
        <div className="flex flex-col w-full gap-2">
          <h4 style={{ margin: 0, textAlign: "left", fontWeight: "500" }}>
            {props.name}
          </h4>
          {isEditing ? (
            <Textarea
              placeholder="Viết bình luận…"
              defaultValue={props.content}
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
              defaultValue={props.content}
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
              {props.dateCreate} gio truoc
            </p>
            <div className="flex gap-3">
              <span
                onClick={() => setIsReplay(true)}
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
              >
                Xóa
              </span>
            </div>
          </div>
          {listReply &&
            listReply.map((reply, index) => {
              if (reply.id_comment === props.id) {
                return (
                  <ReplyComment
                    key={index}
                    name={reply.name}
                    content={reply.content}
                    dateCreate={reply.dateCreate}
                  />
                );
              }
            })}
        </div>
      </div>
    </CardContent>
  );
};

export default Comment;
