import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SecondAside from "../../components/HomeItems/SecondAside/SecondAside";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";

const ChatAi = () => {
  const [response, setResponse] = useState();
  const [sessionId, setSessionId] = useState("");
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(false);
  const [history, setHistory] = useState();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  useEffect(() => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/chat-ai/chat", {
        data: { input: input },
      })
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
    console.log(sessionId);
    console.log(input);
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/chat-ai/chat", {
        data: {
          sessionId: sessionId,
          input: input,
        },
      })
      .then((res) => {
        console.log(res);
        setResponse(res.data.data.response);
        setHistory(res.data.data.history);
        setSessionId(res.data.data.sessionId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full h-screen flex">
      <div
        className={`w-full ${
          selected ? "hidden" : "block"
        } md:w-1/4 md:block h-full  flex flex-col`}
      >
        <div className="px-4 py-2 flex gap-2 justify-start items-center h-[58px]">
          <KeyboardReturnIcon
            fontSize="small"
            className="cursor-pointer"
            onClick={handleBack}
          />
          <h3 className="text-[18px] font-bold">Trò chuyện</h3>
        </div>
      </div>
      <main className="md:col-span-7 flex flex-col md:py-4 mt-[42px] md:mt-[58px] md:pr-8">
        <h1 className="text-center font-bold text-[20px] w-full h-[10%] flex justify-center">
          Chat GPT
        </h1>
        <div className="h-[80%] w-full bg-orange-200 ">
          <div className="w-full h-full overflow-scroll no-scrollbar flex flex-col-reverse relative gap-4 py-2 px-3  box-border  justify-between">
            <p>ha</p>
            <p>ha</p>
            <p>ha</p>
            <p>ha</p>
            <p>ha</p>
            <p>ha</p>
            <p>ha</p>
            <p>ha</p>
            <p>ha</p>
            <p>ha</p>
            <p>ha</p>
          </div>
        </div>
        <div className="h-[10%] w-full bg-red-600 flex relative"></div>
      </main>

      <input
        className="border border-sky-500"
        placeholder="Nhập..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => handleOnRequest()}>Send</button>
      {history
        ? history.map((el) => (
            <>
              <p>{el.kwarg.content}</p>
            </>
          ))
        : null}
      {response ? <p>{response}</p> : null}
    </div>
  );
};

export default ChatAi;
