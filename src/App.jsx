import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import PrivateArea from "./components/PrivateArea/PrivateArea";
import Home from "./pages/Home/Home";
import PrivateArea2 from "./components/PrivateArea/PrivateArea2";
import Chat from "./pages/Chat/Chat";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateArea />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<PrivateArea2 />}>
            <Route path="/message/:id?" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
