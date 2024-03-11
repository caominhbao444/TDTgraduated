import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import PrivateArea from "./components/PrivateArea/PrivateArea";
import Home from "./pages/Home/Home";
import PrivateArea2 from "./components/PrivateArea/PrivateArea2";
import Chat from "./pages/Chat/Chat";
import Friends from "./pages/Friends/Friends";
import Detail from "./pages/Detail/Detail";
import Post from "./pages/Post/Post";
import Event from "./pages/Event/Event";
// import { useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserDetails } from './store/usersSlice';

function App() {
  // const dispatch = useDispatch()
  // const userDetail = useSelector((state) => state.user.userDetail);

  // // useEffect(() => {
  //   if(!userDetail.id) {
  //     axios.get(import.meta.env.VITE_APP_BASE_URL + '/users/me', {
  //       headers: {
  //         Authorization: `Bearer ` + localStorage.getItem('token')
  //       }
  //     }).then((res) => {
  //       dispatch(setUserDetails(res.data))
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  //   }
  // // }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateArea />}>
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/events" element={<Event />} />
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
