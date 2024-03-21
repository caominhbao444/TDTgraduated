import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SecondAside from "../../components/HomeItems/SecondAside/SecondAside";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";
import { Avatar, Card, message } from "antd";
import SendIcon from "@mui/icons-material/Send";
import robot from "../../assets/robot.jpg";
import { CircularProgress } from "@mui/material";
const ChatAi = () => {
  const [response, setResponse] = useState();
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(false);
  const [history, setHistory] = useState();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  useEffect(() => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/chat-ai/chat",
        {
          data: {},
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setResponse(res.data.data.response);
        setSessionId(res.data.data.sessionId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleOnRequest = () => {
    setLoading(true);
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/chat-ai/chat",
        {
          data: {
            sessionId: sessionId,
            input: input,
          },
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setInput("");
        setLoading(false);
        setResponse(res.data.data.response);
        setHistory(res.data.data.history);
        setSessionId(res.data.data.sessionId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("history", history);
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 md:gap-8 min-h-screen bg-[#f7f7f7] ">
      <main className="md:col-span-7 flex flex-col md:gap-8 gap-4 md:py-4 mt-[42px] md:mt-[58px] md:pl-8 ">
        <div className="h-[calc(100vh-100px)] flex flex-col justify-between ">
          <div className=" w-full h-full overflow-scroll no-scrollbar flex flex-col-reverse relative gap-4 py-2 px-3">
            <div className="w-full h-full  top-0 left-0 right-0 bg-3d absolute"></div>

            {response && !history && (
              <>
                <div className="flex w-full justify-start">
                  <div className="z-10 md:w-[70%] w-full flex ">
                    <div className="flex items-start justify-end pr-2">
                      <Avatar
                        alt="Remy Sharp"
                        src={robot}
                        sx={{ width: 40, height: 40 }}
                      />
                    </div>
                    <div className="md:w-[95%] w-[80%] ">
                      <div className="max-w-full bg-white text-justify p-2 rounded-tr-lg rounded-b-lg">
                        {response && response}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="flex w-full justify-end">
                  <div className="z-10 md:w-[60%] w-full  flex flex-row-reverse">
                    <div className="md:w-[90%] w-[80%] ">
                      <div className="w-full bg-white text-justify p-2 rounded-t-lg rounded-bl-lg">
                        {el.message}
                      </div>
                    </div>
                  </div>
                </div> */}
              </>
            )}
            {response &&
              history &&
              history
                .slice(1)
                .reverse()
                .map((message, index) => {
                  const isHumanMessage = message.id[2] === "HumanMessage";
                  ("justify-start");

                  return (
                    <>
                      {!isHumanMessage ? (
                        <>
                          <div
                            className="flex w-full justify-start"
                            key={index}
                          >
                            <div className="z-10 md:w-[70%] w-full flex ">
                              <div className="flex items-start justify-end pr-2">
                                <Avatar
                                  alt="Remy Sharp"
                                  src={robot}
                                  sx={{ width: 40, height: 40 }}
                                />
                              </div>
                              <div className="md:w-[95%] w-[80%] ">
                                <div className="max-w-full bg-white text-justify p-2 rounded-tr-lg rounded-b-lg">
                                  {message.kwargs.content}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex w-full justify-end" key={index}>
                            <div className="z-10 md:w-[60%] w-full  flex flex-row-reverse">
                              <div className="md:w-[90%] w-[80%] ">
                                <div className="w-full bg-white text-justify p-2 rounded-t-lg rounded-bl-lg">
                                  {message.kwargs.content}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  );
                })}
            {/* {AI} */}
            {/* <div className="flex w-full justify-start">
              <div className="z-10 md:w-[70%] w-full flex ">
                <div className="flex items-start justify-end pr-2">
                  <Avatar
                    alt="Remy Sharp"
                    src={robot}
                    sx={{ width: 40, height: 40 }}
                  />
                </div>
                <div className="md:w-[95%] w-[80%] ">
                  <div className="max-w-full bg-white text-justify p-2 rounded-tr-lg rounded-b-lg">
                    {response && response}
                  </div>
                </div>
              </div>
            </div> */}
            {/* Human */}
            {/* <div className="flex w-full justify-end">
              <div className="z-10 md:w-[60%] w-full  flex flex-row-reverse">
                <div className="md:w-[90%] w-[80%] ">
                  <div className="w-full bg-white text-justify p-2 rounded-t-lg rounded-bl-lg">
                    {el.message}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="bg-[#E6E6E6] w-full h-[58px] box-border p-2 flex items-center justify-center">
            <textarea
              className="md:w-[95%] w-[90%] h-[42px] max-h-[100px] resize-none border-none outline-none px-2 py-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={() => handleOnRequest()}
              className="md:w-[5%] w-[10%] flex items-center justify-center h-full"
            >
              {loading ? (
                <CircularProgress className="h-full w-full disabled block " />
              ) : (
                <SendIcon className="h-full w-full cursor-pointer block " />
              )}
            </button>
          </div>
        </div>
      </main>
      <aside className="bg-white md:col-span-2 hidden md:flex flex-col  sticky top-[58px]  h-[calc(100vh-58px)]">
        <SecondAside />
      </aside>
    </div>
  );
};

export default ChatAi;
