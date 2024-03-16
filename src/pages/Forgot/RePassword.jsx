import Swal from "sweetalert2";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const validationSchema = yup.object({
  password: yup
    .string("Vui lòng nhập mật khẩu.")
    .min(8, "Mật khẩu phải chứa ít nhất 8 kí tự.")
    .matches(/^(?=.*[a-z])/, "Mật khẩu phải chứa 1 kí tự viết thường.")
    .matches(/^(?=.*[A-Z])/, "Mật khẩu phải chứa 1 kí tự viết hoa.")
    .matches(/^(?=.*[0-9])/, "Mật khẩu phải chứa 1 chữ số")
    .required("Vui lòng nhập trường này."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu phải khớp"),
});
const RePassword = () => {
  const [data, setData] = useState({
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("onSubmit", data);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: data,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  return (
    <div className="w-full h-screen flex justify-center items-center bg-mainColor">
      <form
        className="md:w-[300px] w-full flex flex-col bg-white p-4 gap-3 rounded-lg"
        onSubmit={formik.handleSubmit}
      >
        <h3 className="text-center font-bold">Quên mật khẩu</h3>
        <div className="flex flex-col gap-2">
          <TextField
            label="Mật khẩu mới"
            id="password"
            variant="filled"
            size="small"
            className="w-full"
            autoComplete="off"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showPassword ? "text" : "password"}
            InputProps={{
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
        <div className="flex flex-col gap-2">
          <TextField
            label="Nhập lại mật khẩu mới"
            id="confirmPassword"
            variant="filled"
            size="small"
            className="w-full"
            autoComplete="off"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            type={showPassword ? "text" : "password"}
            InputProps={{
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
        <div className="flex flex-col">
          <button className="px-2 py-2 border bg-mainColor text-white border-mainColor hover:bg-white hover:text-mainColor">
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
};

export default RePassword;
