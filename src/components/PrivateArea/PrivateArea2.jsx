import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";

const PrivateArea2 = () => {
  const [auth, setAuth] = useState(true);
  return auth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Login />
  );
};

export default PrivateArea2;
