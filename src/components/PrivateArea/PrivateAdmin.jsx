import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserDetails } from "../../store/usersSlice";
import Login from "../../pages/Login/Login";
import NotFound from "../../pages/NotFound/NotFound";
import { CircularProgress } from "@mui/material";

const PrivateAdmin = () => {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const userDetail = useSelector((state) => state.user.userDetail);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  useEffect(() => {
    if (authToken) {
      axios
        .get(import.meta.env.VITE_APP_BASE_URL + "/user-details", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          dispatch(setUserDetails(res.data));
          setRole(res.data.role.id);
          setLoading(false);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/notfound");
    }
  }, [dispatch, authToken]);
  return loading ? (
    <>
      <Navbar />
      <div className="w-full h-full flex justify-center items-center">
        <CircularProgress />
      </div>
    </>
  ) : loading === false && role && role === 3 ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <NotFound />
  );
};

export default PrivateAdmin;
