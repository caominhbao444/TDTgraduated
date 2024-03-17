import { useState } from "react";
import { TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string("Vui lòng nhập email.")
    .email("Email không hợp lệ.")
    .matches(/@gmail\.com$/, "Email phải là địa chỉ Gmail")
    .required("Vui lòng nhập trường này."),
});

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };
  const navigate = useNavigate();
  const onSubmit = (values) => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + `/forgot-password`, {
        email: values.email,
      })
      .then((res) => {
        Swal.fire({
          title: "Thành công",
          text: "Vui lòng kiểm tra mail.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Thất bại",
          text: "Vui lòng kiểm tra lại dữ liệu!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-mainColor">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <form
            className="md:w-[300px] w-full flex flex-col bg-white p-4 gap-3 rounded-lg"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="text-center font-bold">Quên mật khẩu</h3>
            <div className="flex flex-col gap-2">
              <TextField
                label="Email"
                id="email"
                variant="filled"
                size="small"
                className="w-full"
                autoComplete="off"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="flex flex-col">
              <button
                className="px-2 py-2 border bg-mainColor text-white border-mainColor hover:bg-white hover:text-mainColor"
                type="submit"
              >
                Gửi
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
