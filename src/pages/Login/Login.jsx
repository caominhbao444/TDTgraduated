import { useState } from "react";
import LoginImg from "../../assets/login.png";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/usersSlice';

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSignin = (e) => {
    e.preventDefault();
    axios
    .post(import.meta.env.VITE_APP_BASE_URL + `/auth/local`, {
      identifier: username,
      password: password
    }).then((res) => {
      dispatch(setLogin(res.data))
      navigate("/home");
    }).catch((error) => {
      console.log(error)
    })
  };
  return (
    <div className="bg-mainColor h-screen w-full md:px-8 md:py-14">
      <div className="h-full w-full bg-white flex rounded shadow-lg">
        <div className="w-0 md:w-1/2 h-full  flex flex-col">
          <img
            src={LoginImg}
            alt="login-img"
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col items-center md:py-5 justify-center gap-5">
          <div className="w-2/3 md:w-full px-3">
            <h1 className="text-center text-[20px]">
              Chào mừng đến với <span className="font-bold">TDTUGrad</span>
            </h1>
            <h3 className="text-center text-[14px]">
              Kết nối những cựu sinh viên trường Đại học Tôn Đức Thắng
            </h3>
          </div>
          <form className="flex flex-col gap-5 w-2/3 md:w-2/3">
            <div className="w-full">
              <TextField
                name="username"
                id="username"
                autoComplete="off"
                label="Tên đăng nhập"
                variant="outlined"
                className="w-full"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <TextField
                name="password"
                id="password1"
                label="Mật khẩu"
                autoComplete="off"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                className="w-full"
                value={password}
                // helperText="Incorrect entry."
                // error
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="w-full">
              <button
                className="px-[20px] py-[10px] w-full bg-mainColor text-white hover:text-mainColor hover:bg-white border border-mainColor rounded-[4px]"
                onClick={handleSignin}
              >
                Đăng nhập
              </button>
            </div>
            <div className="flex justify-end">
              <div className="flex flex-col">
                <Link
                  to="/signup"
                  className="text-[14px] cursor-pointer text-textLightColor"
                >
                  Bạn chưa có tài khoản?
                </Link>
                <span className="text-[14px] cursor-pointer text-end text-textLightColor">
                  Quên mật khẩu
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
