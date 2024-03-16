import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatAi = () => {
    const [response, setResponse] = useState()
    const [sessionId, setSessionId] = useState("")
    const [input, setInput] = useState("")
    const [history, setHistory] = useState();
    useEffect(() => {
        axios.post( import.meta.env.VITE_APP_BASE_URL +'/chat-ai/chat', {
            data: {}
        }, {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token"),
            }
        }).then((res) => {
            console.log(res)
            setResponse(res.data.data.response)
            setSessionId(res.data.data.sessionId)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    const handleOnRequest = () => {
        console.log(sessionId)
        console.log(input)
        axios.post( import.meta.env.VITE_APP_BASE_URL +'/chat-ai/chat', {
            data: {
                sessionId: sessionId,
                input: input
            } 
        }, {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token"),
            }
        }).then((res) => {
            console.log(res)
            setResponse(res.data.data.response)
            setHistory(res.data.data.history)
            setSessionId(res.data.data.sessionId)
        }).catch((error) => {
            console.log(error)
        })
    }
  return (
    <div className="w-full h-screen">
      <h1 className="text-center">Open Ai</h1>
      <input className="border border-sky-500" placeholder="Nhập..." onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => handleOnRequest()}>Send</button>
      {
        history ? history.map((el) => (
            <>
                <p>{el.kwarg.content}</p>
            </>
        )):
        null
      }
      {
        response ? 
        <p>{response}</p>:
        null
      }
    </div>
  );
};

export default ChatAi;
