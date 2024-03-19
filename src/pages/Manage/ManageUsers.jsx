import {
  DeleteOutlined,
  EditOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Button, Image, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { API_FACULTY, API_USERS } from "../../fakeApi";
import { useDispatch, useSelector } from "react-redux";
import {
  CallApiDeleteUser,
  CallApiListAllFriends,
  CallApiUpdateUser,
} from "../../store/users2Slice";
import Swal from "sweetalert2";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
const ManageUsers = () => {
  const [searchText, setSearchText] = useState("");
  const authToken = localStorage.getItem("token");
  const [listOrder, setListOrder] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [userInforEdit, setUserInForEdit] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [country, setCountry] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const paginationConfig = {
    className: "centered-pagination",
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [listCity, setListCity] = useState("");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const lengthOfCourse = currentYear - 1996;
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const listCourse = Array.from(
    { length: lengthOfCourse },
    (_, index) => index + 1
  );
  const dispatch = useDispatch();
  const listAllFriends = useSelector((state) => state.user2.listAllFriends);
  const onDeleteUser = (record) => {
    dispatch(
      CallApiDeleteUser({
        headers: { authorization: `Bearer ${authToken}` },
        id: record.id,
      })
    )
      .then(() => {
        Swal.fire({
          title: "Thành công!",
          text: "Xóa tài khoản thành công!",
          icon: "success",
          confirmButtonColor: `#1877f2`,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(
              CallApiListAllFriends({
                headers: { authorization: `Bearer ${authToken}` },
              })
            ); // Dispatch action to reload friends list
          }
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Thất bại!",
          text: "Vui lòng chờ kiểm tra thông tin từ quản trị viên!",
          icon: "error",
          confirmButtonColor: `#1877f2`,
          confirmButtonText: "Xác nhận",
        });
      });
  };
  const handleClickClose = () => {
    setOpenDialog(false);
    setUserInForEdit("");
    setUsername("");
    setFullname("");
    setEmail("");
    setGender("");
    setCountry("");
    setFaculty("");
    setCourse("");
    setRole("");
  };
  const handleClickCloseDialogAdd = () => {
    setOpenDialogAdd(false);
    setUserInForEdit("");
    setUsername("");
    setFullname("");
    setEmail("");
    setGender("");
    setCountry("");
    setFaculty("");
    setCourse("");
    setRole("");
  };
  const onUpdateUser = (record) => {
    setUserInForEdit({ ...record });
    setOpenDialog(true);
  };

  useEffect(() => {
    axios
      .get(
        "https://vapi.vnappmob.com/api/province/?fbclid=IwAR29lW0N7ZKj5Bm2_Ih5cT6wzihhQFxCPMn20NTwGZkkYwbqTvfTN8o2tX8"
      )
      .then((response) => {
        setListCity(response.data.results);
      });
  }, []);

  useEffect(() => {
    if (userInforEdit) {
      setUsername(userInforEdit.username);
      setFullname(userInforEdit.fullname);
      setEmail(userInforEdit.email);
      setGender(userInforEdit.gender);
      setCountry(userInforEdit.country);
      setFaculty(userInforEdit.faculty);
      setCourse(userInforEdit.course);
      setRole(userInforEdit.role.id);
    }
  }, [userInforEdit]);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
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
        Formik.setFieldValue("image", url);
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
  const handleUpdateUser = () => {
    dispatch(
      CallApiUpdateUser({
        headers: { authorization: `Bearer ${authToken}` },
        userId: userInforEdit.id,
        data: {
          username: username,
          fullname: fullname,
          email: email,
          gender: gender,
          country: country,
          faculty: faculty,
          course: course,
          role: role,
        },
      })
    )
      .then((res) => {
        setOpenDialog(false);
        Swal.fire({
          title: "Thành công",
          text: "Cập nhật thông tin thành công",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setUserInForEdit("");
          setUsername("");
          setFullname("");
          setEmail("");
          setGender("");
          setCountry("");
          setFaculty("");
          setCourse("");
          setRole("");
          dispatch(
            CallApiListAllFriends({
              headers: { authorization: `Bearer ${authToken}` },
            })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCreateUser = () => {
    if (
      username &&
      fullname &&
      email &&
      gender &&
      country &&
      faculty &&
      course &&
      password &&
      role
    ) {
      setLoadingCreate(true);
      axios
        .post(import.meta.env.VITE_APP_BASE_URL + `/auth/register`, {
          fullname: fullname,
          email: email,
          username: username,
          password: password,
          gender: gender,
          country: country,
          course: course,
          faculty: faculty,
          image: imageUrl,
          role: role,
          confirmed: true,
        })
        .then((res) => {
          setOpenDialogAdd(false);
          Swal.fire({
            title: "Thành công",
            text: "Thêm tài khoản thành công!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            setUsername("");
            setFullname("");
            setEmail("");
            setGender("");
            setCountry("");
            setFaculty("");
            setCourse("");
            setRole("");
            dispatch(
              CallApiListAllFriends({
                headers: { authorization: `Bearer ${authToken}` },
              })
            );
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if (listAllFriends) {
      setListOrder([...listAllFriends].sort((a, b) => a.id - b.id));
      console.log("listAllFriends", listAllFriends);
    }
  }, [listAllFriends]);

  return (
    <div className="grid grid-cols-1 min-h-screen bg-[#f7f7f7] ">
      <main className="md:col-span-7 flex flex-col md:gap-4 gap-4 md:py-4 mt-[42px] md:mt-[58px] md:px-8">
        <h3 className="text-center md:text-[20px] md:font-bold">
          Quản lý người dùng
        </h3>
        <Input.Search
          placeholder="Nhập thông tin cần tìm..."
          onSearch={(value) => {
            setSearchText(value);
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <div className="w-full flex justify-end items-center">
          <button
            className="p-2 border rounded-md bg-mainColor text-white border-mainColor text-[14px] font-medium hover:bg-white hover:text-mainColor"
            onClick={() => setOpenDialogAdd(true)}
          >
            Thêm người dùng
          </button>
        </div>
        {listOrder && (
          <Table
            columns={[
              { title: "STT", render: (text, record, index) => index + 1 },
              {
                title: "Họ và tên",
                dataIndex: "fullname",
                filteredValue: [searchText],
                onFilter: (value, record) => {
                  return (
                    String(record.fullname)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.uesrname)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.email)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.country)
                      .toLowerCase()
                      .includes(value.toLowerCase())
                  );
                },
              },
              {
                title: "Tên đăng nhập",
                dataIndex: "username",
              },

              {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Địa chỉ",
                dataIndex: "country",
              },

              {
                title: "Vai trò",
                dataIndex: "role",
                render: (role) => {
                  return role.id === 3 ? "Admin" : "User";
                },
              },
              {
                title: "",
                render: (record) => {
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "20px",
                          alignItems: "center",
                        }}
                      >
                        <EditOutlined
                          style={{
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => onUpdateUser(record)}
                        />
                        <DeleteOutlined
                          style={{
                            color: "red",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => onDeleteUser(record)}
                        />
                      </div>
                    </>
                  );
                },
              },
            ]}
            dataSource={listOrder.map((item, index) => ({
              ...item,
              key: index,
            }))}
            onChange={onChange}
            locale={{
              triggerDesc: "Giảm dần",
              triggerAsc: "Tăng dần",
              cancelSort: "Hủy",
              emptyText: "Không có dữ liệu",
            }}
            bordered
            pagination={paginationConfig}
          ></Table>
        )}

        <React.Fragment>
          <Dialog
            fullScreen={fullScreen}
            open={openDialog}
            onClose={handleClickClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">
              Chỉnh sửa thông tin người dùng
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
              <div className=" flex flex-col gap-3">
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    label="Họ và tên"
                    id="fullname"
                    variant="filled"
                    size="small"
                    className="w-full"
                    autoComplete="off"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    label="Tên đăng nhập"
                    id="username"
                    variant="filled"
                    size="small"
                    className="w-full"
                    autoComplete="off"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    label="Email"
                    id="email"
                    variant="filled"
                    size="small"
                    className="w-full"
                    autoComplete="off"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    id="country"
                    label="Quê quán"
                    name="country"
                    autoComplete="off"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    select
                    className="w-full"
                  >
                    {listCity ? (
                      listCity.map((city) => {
                        return (
                          <MenuItem
                            value={city.province_name}
                            key={city.province_id}
                          >
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
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    id="faculty"
                    label="Khoa"
                    name="faculty"
                    autoComplete="off"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full"
                    select
                  >
                    {API_FACULTY ? (
                      API_FACULTY.map((item) => {
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
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    id="role"
                    label="Vai trò"
                    autoComplete="off"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    name="role"
                    select
                    className="w-full"
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={1}>User</MenuItem>
                    <MenuItem value={3}>Admin</MenuItem>
                  </TextField>
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    id="course"
                    label="Khoá học"
                    name="course"
                    autoComplete="off"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    c
                    className="w-full"
                    select
                  >
                    {listCourse ? (
                      listCourse.map((course) => {
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
              </div>
            </DialogContent>
            <DialogActions>
              <button
                onClick={handleClickClose}
                className="px-2 py-2 bg-white rounded-md text-mainColor border border-mainColor"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-2 py-2 bg-mainColor rounded-md text-white"
              >
                Cập nhật
              </button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        <React.Fragment>
          <Dialog
            fullScreen={fullScreen}
            open={openDialogAdd}
            onClose={handleClickCloseDialogAdd}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Thêm người dùng</DialogTitle>
            <DialogContent
              dividers={scroll === "paper"}
              className="md:w-[500px]"
            >
              <div className=" flex flex-col gap-3">
                <div className="w-full h-[200px] relative">
                  {loading ? (
                    <>
                      <img
                        src={imageUrl}
                        className="h-[200px] w-full object-cover object-center"
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
                        className="h-[200px] w-full object-cover object-center"
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
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    label="Họ và tên"
                    id="fullname"
                    variant="filled"
                    size="small"
                    className="w-full"
                    autoComplete="off"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    label="Tên đăng nhập"
                    id="username"
                    variant="filled"
                    size="small"
                    className="w-full"
                    autoComplete="off"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    label="Mật khẩu"
                    id="password"
                    variant="filled"
                    size="small"
                    autoComplete="off"
                    className="w-full"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    label="Email"
                    id="email"
                    variant="filled"
                    size="small"
                    className="w-full"
                    autoComplete="off"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    id="role"
                    label="Vai trò"
                    defaultValue=""
                    autoComplete="off"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    name="role"
                    select
                    className="w-full"
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={1}>User</MenuItem>
                    <MenuItem value={3}>Admin</MenuItem>
                  </TextField>
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    id="gender"
                    label="Giới tính"
                    defaultValue=""
                    autoComplete="off"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    select
                    className="w-full"
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="Nam">Nam</MenuItem>
                    <MenuItem value="Nữ">Nữ</MenuItem>
                  </TextField>
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    id="country"
                    label="Quê quán"
                    defaultValue=""
                    name="country"
                    autoComplete="off"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    select
                    className="w-full"
                  >
                    {listCity ? (
                      listCity.map((city) => {
                        return (
                          <MenuItem
                            value={city.province_name}
                            key={city.province_id}
                          >
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
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    id="faculty"
                    label="Khoa"
                    defaultValue=""
                    name="faculty"
                    autoComplete="off"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full"
                    select
                  >
                    {API_FACULTY ? (
                      API_FACULTY.map((item) => {
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
                <div className="flex flex-col w-full justify-center items-start">
                  <TextField
                    id="course"
                    label="Khoá học"
                    defaultValue=""
                    name="course"
                    autoComplete="off"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    c
                    className="w-full"
                    select
                  >
                    {listCourse ? (
                      listCourse.map((course) => {
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
              </div>
            </DialogContent>
            <DialogActions>
              <button
                onClick={handleClickCloseDialogAdd}
                className="px-2 py-2 bg-white rounded-md text-mainColor border border-mainColor"
              >
                Hủy bỏ
              </button>
              {username &&
              fullname &&
              email &&
              gender &&
              country &&
              faculty &&
              course ? (
                <button
                  onClick={handleCreateUser}
                  className="px-2 py-2 bg-mainColor rounded-md text-white mr-4"
                >
                  {loading ? "Đang tạo..." : "Tạo"}
                </button>
              ) : (
                <>
                  <button
                    className="px-2 py-2 bg-slate-300 rounded-md text-white mr-4"
                    disabled
                  >
                    Tạo
                  </button>
                </>
              )}
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </main>
    </div>
  );
};

export default ManageUsers;
