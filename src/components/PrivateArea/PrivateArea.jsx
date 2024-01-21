import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Navbar from "../Navbar/Navbar";
const PrivateArea = () => {
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

export default PrivateArea;
