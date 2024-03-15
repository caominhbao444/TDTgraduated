import { Login } from "@mui/icons-material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const PrivateAdmin = () => {
  const [auth, setAuth] = useState(true);
  return auth ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Login />
  );
};

export default PrivateAdmin;
