/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SignupImg from "../../assets/signup.png";
import Button from "../../components/Button/Button";
import { IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
const validationSchema = yup.object({
  username: yup
    .string("Vui lòng nhập tên đăng nhập.")
    .required("Vui lòng nhập trường này."),
  email: yup
    .string("Vui lòng nhập email.")
    .email("Email không hợp lệ.")
    .required("Vui lòng nhập trường này."),
  password: yup
    .string("Vui lòng nhập mật khẩu.")
    .min(8, "Mật khẩu phải chứa ít nhất 8 kí tự.")
    .matches(/^(?=.*[a-z])/, "Mật khẩu phải chứa 1 kí tự viết thường.")
    .matches(/^(?=.*[A-Z])/, "Mật khẩu phải chứa 1 kí tự viết hoa.")
    .matches(/^(?=.*[0-9])/, "Mật khẩu phải chứa 1 chữ số")
    .required("Vui lòng nhập trường này."),
});
const validationSchemaTwo = yup.object({
  gender: yup
    .string("Vui lòng chọn giới tính.")
    .required("Vui lòng chọn trường này."),
  country: yup
    .string("Vui lòng nhập trường.")
    .required("Vui lòng nhập trường này."),
  course: yup
    .string("Vui lòng nhập trường.")
    .required("Vui lòng nhập trường này."),
});

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    gender: "",
    country: "",
    course: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [listCity, setListCity] = useState("");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const lengthOfCourse = currentYear - 1996;
  const listCourse = Array.from(
    { length: lengthOfCourse },
    (_, index) => index + 1
  );
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/").then((response) => {
      setListCity(response.data);
    });
  }, []);
  const submitForm = (newData) => {
    console.log("Form data: ", newData);
    // let timerInterval;
    // Swal.fire({
    //   title: "Vui lòng chờ trong giây lát!",
    //   html: "Hệ thống đang kiểm tra thông tin tài khoản.",
    //   timer: 2000,
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading();
    //     const timer = Swal.getPopup().querySelector("b");
    //     timerInterval = setInterval(() => {
    //       timer.textContent = `${Swal.getTimerLeft()}`;
    //     }, 100);
    //   },
    //   willClose: () => {
    //     clearInterval(timerInterval);
    //   },
    // });
  };
  const handleNextStep = (newData, final = false) => {
    if (currentStep !== 0) {
      setData(newData);
      if (final) {
        submitForm(newData);
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };
  const handlePreStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepInitial onSubmit={handleNextStep} />,
    <StepOne onSubmit={handleNextStep} data={data} />,
    <StepTwo
      onSubmit={handleNextStep}
      prev={handlePreStep}
      data={data}
      listCity={listCity}
      listCourse={listCourse}
    />,
  ];
  return (
    <>
      <div className="bg-mainColor h-screen w-full md:flex md:justify-center md:items-center md:px-8 md:py-8">
        <div className="h-full md:h-auto md:max-w-[500px] md:w-[90%] w-full bg-white rounded shadow-lg md:py-4">
          {steps[currentStep]}
        </div>
      </div>
    </>
  );
};
const StepInitial = (props) => {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <h1 className="text-center text-[20px] font-bold">
          Chào mừng đến với TDTGrad
        </h1>
        <h3 className="text-center text-textLightColor text-[16px]">
          Nơi kết nối những cựu học sinh trường Đại học Tôn Đức Thắng
        </h3>
        <img src={SignupImg} className="w-[70%] h-[60%] object-cover" />
        <Button
          title="Tiếp tục"
          className="px-4 py-2 border border-mainColor rounded bg-mainColor text-white hover:text-mainColor hover:bg-white"
          // eslint-disable-next-line react/prop-types
          onClick={props.onSubmit}
        />
      </div>
    </>
  );
};
const StepOne = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onSubmit = (values) => {
    props.onSubmit(values);
  };
  const formik = useFormik({
    initialValues: props.data,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className={`w-full h-full flex flex-col justify-center items-center gap-4 animate-appear-left `}
      >
        <h1 className="text-center text-[20px] font-bold">Đăng ký tài khoản</h1>
        <h3 className="text-center text-textLightColor text-[16px] px-3">
          Hãy nhập thông tin cá nhân của bạn để chúng tôi có thể tạo tài khoản
          cho bạn một cách chính xác
        </h3>
        <div className="w-[70%] flex flex-col gap-1">
          <TextField
            label="Tên đăng nhập"
            id="username"
            variant="filled"
            size="small"
            className="w-full"
            autoComplete="off"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </div>
        <div className="w-[70%] flex flex-col gap-1">
          <TextField
            label="Email"
            id="email"
            variant="filled"
            size="small"
            className="w-full"
            autoComplete="off"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="w-[70%] flex flex-col gap-2">
          <TextField
            label="Mật khẩu"
            id="password"
            variant="filled"
            size="small"
            autoComplete="off"
            className="w-full"
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
        <button
          className="px-4 py-2 border border-mainColor rounded bg-mainColor text-white hover:text-mainColor hover:bg-white"
          type="submit"
        >
          Tiếp tục
        </button>
      </form>
    </>
  );
};
const StepTwo = (props) => {
  const onSubmitFinal = (values) => {
    props.onSubmit(values, true);
  };
  const onPrev = () => {
    props.prev(formik.values);
  };
  const formik = useFormik({
    initialValues: props.data,
    validationSchema: validationSchemaTwo,
    onSubmit: onSubmitFinal,
  });

  return (
    <>
      <form
        className={`w-full h-full flex flex-col justify-center items-center gap-4 animate-appear-left `}
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center text-[20px] font-bold">Đăng ký tài khoản</h1>
        <h3 className="text-center text-textLightColor text-[16px] px-3">
          Hãy nhập thông tin cá nhân của bạn để chúng tôi có thể tạo tài khoản
          cho bạn một cách chính xác
        </h3>
        <div className="w-[70%] flex flex-col gap-1">
          <TextField
            id="gender"
            label="Giới tính"
            autoComplete="off"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="gender"
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
            select
          >
            <MenuItem value="Male">Nam</MenuItem>
            <MenuItem value="Female">Nữ</MenuItem>
          </TextField>
        </div>
        <div className="w-[70%] flex flex-col gap-1">
          <TextField
            id="country"
            label="Quê quán"
            name="country"
            autoComplete="off"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            select
          >
            {props.listCity ? (
              props.listCity.map((city) => {
                return (
                  <MenuItem value={city.name} key={city.code}>
                    {city.name}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value="" disabled>
                Đang tải danh sách thành phố.
              </MenuItem>
            )}
          </TextField>
        </div>
        <div className="w-[70%] flex flex-col gap-1">
          <TextField
            id="course"
            label="Khoá học"
            name="course"
            autoComplete="off"
            value={formik.values.course}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.course && Boolean(formik.errors.course)}
            helperText={formik.touched.course && formik.errors.course}
            select
          >
            {props.listCourse ? (
              props.listCourse.map((course) => {
                return (
                  <MenuItem value={course} key={course}>
                    Khoá {course}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value="" disabled>
                Đang tải danh sách khóa.
              </MenuItem>
            )}
          </TextField>
        </div>
        <div className="w-[70%] flex justify-between items-center">
          <Button
            title="Quay lại"
            className="px-4 py-2 border border-mainColor rounded bg-white text-mainColor hover:text-mainColor hover:bg-white"
            type="button"
            // eslint-disable-next-line react/prop-types
            onClick={onPrev}
          />
          <Button
            title="Đăng ký"
            className="px-4 py-2 border border-mainColor rounded bg-mainColor text-white hover:text-mainColor hover:bg-white"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};
export default Signup;
