import axios from "axios";
import React, { useEffect, useState } from "react";
import socket from "socket.io-client";
const ChatRoom = ({ user, id, room }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const io = socket("http://localhost:1337"); //Connecting to Socket.io backend
  let welcome;
  useEffect(() => {
    io.emit("join", { user, room }, (error) => {
      //Sending the username to the backend as the user connects.
      if (error) return alert(error);
    });
    io.on("welcome", async (data, error) => {
      //Getting the welcome message from the backend
      await axios
        .get("http://localhost:1337/api/messages?filters[room][$eq]=" + room, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }) //Fetching all messages from Strapi
        .then(async (res) => {
          setMessages(res.data.data);
          console.log(res.data.data);
        })
        .catch((e) => console.log(e.message));
    });
    io.on("message", async (data, error) => {
      //Listening for a message connection
      await axios
        .get("http://localhost:1337/api/messages?filters[room][$eq]=" + room, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then(async (res) => {
          setMessages(res.data);
        })
        .catch((e) => console.log(e.message));
    });
  }, [user, io, room]);
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
  console.log("messages", messages);
  return (
    <>
      <h1>Chat Room</h1>
      <br />
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
                  <div key={el.attributes.id}>
                    <h1>{el.attributes.user}</h1>
                    <p>{el.attributes.message}</p>
                  </div>
                </>
              );
            })
          : null}
      </div>
      <button onClick={handleClick}>Send</button>
    </>
  );
};
export default ChatRoom;
