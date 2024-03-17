import axios from "axios";
import React, { useEffect, useState } from "react";
import socket from "socket.io-client";
import { useSelector } from "react-redux";

const ChatRoom = ({ user, id, room }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const io = socket("http://localhost:1337"); //Connecting to Socket.io backend
  const userDetail = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    io.emit("join", { user, room }, (error) => {
      //Sending the username to the backend as the user connects.
      if (error) return alert(error);
    });
    io.on("welcome", async (data, error) => {
      //Getting the welcome message from the backend
      if(room.split('-').filter(el => el == 'undefined').length == 0){
        await axios
        .get("http://localhost:1337/api/messages?roomName=" + room, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }) //Fetching all messages from Strapi
        .then(async (res) => {
          console.log(res.data)
          setMessages(res.data || []);
        })
        .catch((e) => console.log(e.message));
      }else{
        await axios
          .get(import.meta.env.VITE_APP_BASE_URL + "/user-details/", {
            headers: {
              authorization: `Bearer ` + localStorage.getItem("token"),
            },
            params: {
              id: id,
            },
          }).then(async(res) => {
              const room = res.data.username + '-' + userDetail.username
            await axios
              .get("http://localhost:1337/api/messages?roomName=" + room, {
                headers: {
                  Authorization: `Bearer ` + localStorage.getItem("token"),
                },
              }) //Fetching all messages from Strapi
              .then(async (res) => {
                console.log(res.data)
                setMessages(res.data || []);
              })
              .catch((e) => console.log(e.message));
          })
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
      }).then(async(res) => {
          const room = res.data.username + '-' + userDetail.username
          if(!room.split('-').filter(el => el == 'undefined').length == 0){
            await axios
            .get("http://localhost:1337/api/messages?roomName=" + room, {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem("token"),
              },
            }) //Fetching all messages from Strapi
            .then(async (res) => {
              console.log(res.data)
              setMessages(res.data || []);
            })
            .catch((e) => console.log(e.message));
          }
        })
      });
  }, [room]);
  const sendMessage = (message) => {
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
  if(!messages){
    return null
  }
  return (
    <>
      <h1>Chat Room</h1>
      {/* <br />
      <div>
        <p>{room}</p>
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        {messages.length > 0
          ? messages.map((el) => {
              return (
                <>
                  <div key={el.id}>
                    <h1>{el.user}</h1>
                    <p>{el.message}</p>
                  </div>
                </>
              );
            })
          : null}
      </div>
      <button onClick={handleClick}>Send</button> */}
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto">
          {messages.length > 0 &&  messages.map((el, index) => (
            <div
              key={index}
              className={`flex justify-${el.user === userDetail.username ? 'end' : 'start'} mb-4`}
            >
              <div
                className={`${
                  el.user === userDetail.username ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                } rounded-lg p-2 max-w-xs`}
              >
                <p>{el.message}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Input area for sending messages */}
        <div className="flex items-center justify-center p-4">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Type your message..."
            className="flex-grow rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleClick} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
        </div>
      </div>
    </>
  );
};
export default ChatRoom;
