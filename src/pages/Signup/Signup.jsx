/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { API_FACULTY } from "../../fakeApi";
import SignupImg from "../../assets/signup.png";
import Button from "../../components/Button/Button";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const validationSchema = yup.object({
  fullname: yup
    .string("Vui lòng nhập trường ngày")
    .required("Vui lòng nhập trường này"),
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
  faculty: yup
    .string("Vui lòng nhập trường.")
    .required("Vui lòng nhập trường này."),
  course: yup
    .string("Vui lòng nhập trường.")
    .required("Vui lòng nhập trường này."),
});
const validationSchemaThird = yup.object({
  image: yup
    .string("Vui lòng nhập trường.")
    .required("Vui lòng chọn trường này."),
});
const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    gender: "",
    country: "",
    course: "",
    faculty: "",
    image: "",
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
    axios
      .get(
        "https://vapi.vnappmob.com/api/province/?fbclid=IwAR29lW0N7ZKj5Bm2_Ih5cT6wzihhQFxCPMn20NTwGZkkYwbqTvfTN8o2tX8"
      )
      .then((response) => {
        setListCity(response.data.results);
      });
  }, []);
  useEffect(() => {}, [listCity]);
  console.log("ListCity", listCity);
  const submitForm = (newData) => {
    console.log("Form data: ", newData);
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + `/auth/register`, newData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
      listFaculty={API_FACULTY}
    />,
    <StepThird onSubmit={handleNextStep} prev={handlePreStep} data={data} />,
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
  const navigate = useNavigate();
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
        <div
          className="cursor-pointer text-[14px] text-textLightColor"
          onClick={() => navigate("/home")}
        >
          Quay lại trang đăng nhập
        </div>
      </div>
    </>
  );
};
const StepOne = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
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
            label="Họ và tên"
            id="fullname"
            variant="filled"
            size="small"
            className="w-full"
            autoComplete="off"
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />
        </div>
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
        <div
          className="cursor-pointer text-[14px] text-textLightColor"
          onClick={() => navigate("/home")}
        >
          Quay lại trang đăng nhập
        </div>
      </form>
    </>
  );
};
const StepTwo = (props) => {
  const navigate = useNavigate();
  const onSubmitFinal = (values) => {
    props.onSubmit(values);
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
                  <MenuItem value={city.province_name} key={city.province_id}>
                    {city.province_name}
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
            id="faculty"
            label="Khoa"
            name="faculty"
            autoComplete="off"
            value={formik.values.faculty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.faculty && Boolean(formik.errors.faculty)}
            helperText={formik.touched.faculty && formik.errors.faculty}
            select
          >
            {props.listFaculty ? (
              props.listFaculty.map((item) => {
                return (
                  <MenuItem value={item.name} key={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value="" disabled>
                Đang tải danh sách khoa.
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
        <div
          className="cursor-pointer text-[14px] text-textLightColor"
          onClick={() => navigate("/home")}
        >
          Quay lại trang đăng nhập
        </div>
      </form>
    </>
  );
};
const StepThird = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  function handleFileChange(event) {
    setLoading(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setLoading(false);
        setImageUrl(url);
        formik.setFieldValue("image", url);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }
  function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pzoe2lzh");
    return axios
      .post("https://api.cloudinary.com/v1_1/djhhzmcps/image/upload", formData)
      .then((response) => {
        return response.data.url;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
  const onSubmitFinal = (values) => {
    props.onSubmit(values, true);
  };
  const onPrev = () => {
    props.prev(formik.values);
  };
  const formik = useFormik({
    initialValues: props.data,
    validationSchema: validationSchemaThird,
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
        <div className="w-[70%] flex flex-col gap-1 items-center">
          <div className="w-[40vw] h-[40vw] md:w-[200px] md:h-[200px] rounded-[100%] bg-black relative">
            {loading ? (
              <>
                <img
                  src={imageUrl}
                  width="100%"
                  alt="bag photos"
                  className="w-full h-full object-cover object-center rounded-[100%]"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <CircularProgress />
                </div>
              </>
            ) : (
              <>
                <img
                  src={imageUrl}
                  width="100%"
                  alt="bag photos"
                  className="w-full h-full object-cover object-center rounded-[100%] "
                />
                <input
                  onChange={handleFileChange}
                  type="file"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    opacity: "0",
                    cursor: "pointer",
                  }}
                />
              </>
            )}
          </div>
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
