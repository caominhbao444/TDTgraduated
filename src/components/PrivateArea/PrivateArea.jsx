import { Outlet } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../store/usersSlice";
const PrivateArea = () => {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    if (!userDetail.id) {
      axios
        .get(import.meta.env.VITE_APP_BASE_URL + "/user-details", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          dispatch(setUserDetails(res.data));
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return isAuth ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Login />
  );
};

export default PrivateArea;
