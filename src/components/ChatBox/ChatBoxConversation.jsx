import { useEffect, useState } from "react";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, CircularProgress } from "@mui/material";
import Loading from "../Loading/Loading";
import socket from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
const ChatBoxConversation = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const io = socket("http://localhost:1337"); //Connecting to Socket.io backend
  const userDetail = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    const { user, id, room } = props;
    io.emit("join", { user, room }, (error) => {
      //Sending the username to the backend as the user connects.
      if (error) return alert(error);
    });
    io.on("welcome", async (data, error) => {
      //Getting the welcome message from the backend
      if (room.split("-").filter((el) => el == "undefined").length == 0) {
        await axios
          .get("http://localhost:1337/api/messages?roomName=" + room, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("token"),
            },
          }) //Fetching all messages from Strapi
          .then(async (res) => {
            console.log(res.data);
            setMessages(res.data || []);
          })
          .catch((e) => console.log(e.message));
      } else {
        await axios
          .get(import.meta.env.VITE_APP_BASE_URL + "/user-details/", {
            headers: {
              authorization: `Bearer ` + localStorage.getItem("token"),
            },
            params: {
              id: id,
            },
          })
          .then(async (res) => {
            const room = res.data.username + "-" + userDetail.username;
            await axios
              .get("http://localhost:1337/api/messages?roomName=" + room, {
                headers: {
                  Authorization: `Bearer ` + localStorage.getItem("token"),
                },
              }) //Fetching all messages from Strapi
              .then(async (res) => {
                console.log(res.data);
                setMessages(res.data || []);
              })
              .catch((e) => console.log(e.message));
          });
      }
    });
    io.on("message", async (data, error) => {
      //Listening for a message connection
      await axios
        .get(import.meta.env.VITE_APP_BASE_URL + "/user-details/", {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("token"),
          },
          params: {
            id: id,
          },
        })
        .then(async (res) => {
          const room = res.data.username + "-" + userDetail.username;
          if (room.split("-").filter((el) => el == "undefined").length == 0) {
            await axios
              .get("http://localhost:1337/api/messages?roomName=" + room, {
                headers: {
                  Authorization: `Bearer ` + localStorage.getItem("token"),
                },
              }) //Fetching all messages from Strapi
              .then(async (res) => {
                console.log(res.data);
                setMessages(res.data || []);
              })
              .catch((e) => console.log(e.message));
          }
        });
    });
  }, [props.room]);
  const sendMessage = (message) => {
    const { user, room } = props;
    if (message) {
      io.emit("sendMessage", { message, user: user, room: room }, (error) => {
        if (error) {
          alert(error);
        }
      });
      setMessage("");
    } else {
      alert("Message can't be empty");
    }
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleClick = () => {
    sendMessage(message);
  };
  if (!messages) {
    return null;
  }
  return (
    <div className="h-[calc(100vh-58px)] bg-[#D6D6D6] overflow-scroll no-scrollbar box-border w-full flex flex-col justify-between">
      {props.id ? (
        <>
          <div className=" w-full h-full overflow-scroll no-scrollbar flex flex-col relative gap-4 py-2 px-3">
            <div className="w-full h-full top-0 left-0 right-0 bg-3d absolute"></div>
            {/* <Loading /> */}
            {messages.length > 0 &&
              messages.map((el, index) => {
                return (
                  <>
                    {el.user === userDetail.username && (
                      <div className="flex w-full justify-end" key={index}>
                        <div className="z-10 md:w-[60%] w-full  flex flex-row-reverse">
                          <div className="md:w-[90%] w-[80%] ">
                            <div className="w-full bg-white text-justify p-2 rounded-t-lg rounded-bl-lg">
                              {el.message}
                            </div>
                            {/* <div className="text-[13px] text-right pr-2">
                              Đã gửi ngày 3/3/2024
                            </div> */}
                          </div>
                        </div>
                      </div>
                    )}
                    {el.user !== userDetail.username && (
                      <div className="flex w-full justify-start" key={index}>
                        <div className="z-10 md:w-[70%] w-full flex ">
                          <div className="flex items-start justify-end pr-2">
                            <Avatar
                              alt="Remy Sharp"
                              src="http://res.cloudinary.com/djhhzmcps/image/upload/v1710595194/h5ciy7ec1caco9vh4xqn.png"
                              sx={{ width: 40, height: 40 }}
                            />
                          </div>
                          <div className="md:w-[95%] w-[80%] ">
                            <div className="max-w-full bg-white text-justify p-2 rounded-tr-lg rounded-b-lg">
                              {el.message}
                            </div>
                            {/* <div className="text-left text-[13px] pl-2">
                              Đã gửi ngày 3/3/2024
                            </div> */}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}

            {/* mess */}
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full bg-[#F2F2F2] flex justify-center items-center">
            Vui lòng chọn cuộc trò chuyện
          </div>
        </>
      )}

      <div className="bg-[#E6E6E6] w-full h-[58px] box-border p-2 flex items-center justify-center">
        <textarea
          className="md:w-[95%] w-[90%] h-[42px] max-h-[100px] resize-none border-none outline-none px-2 py-1"
          value={message}
          onChange={handleChange}
        />
        <div
          className="md:w-[5%] w-[10%] flex items-end justify-center"
          onClick={handleClick}
        >
          <SendIcon className="h-full w-full cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ChatBoxConversation;
