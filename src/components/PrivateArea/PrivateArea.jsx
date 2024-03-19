import { Outlet, useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../store/usersSlice";

const PrivateArea = () => {
  const authToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken && !userDetail.id) {
      axios
        .get(import.meta.env.VITE_APP_BASE_URL + "/user-details", {
          headers: {
            Authorization: `Bearer ` + authToken,
          },
        })
        .then((res) => {
          dispatch(setUserDetails(res.data));
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (!authToken) {
      navigate("/");
    }
  }, [authToken, userDetail.id, dispatch, navigate]);

  return authToken ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Login />
  );
};

export default PrivateArea;
