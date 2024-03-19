import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
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
  const [gender, setGender] = useState("Male");
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
  };
  const handleClickCloseDialogAdd = () => {
    setOpenDialogAdd(false);
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
    }
  }, [userInforEdit]);
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
        },
      })
    )
      .then((res) => {
        setOpenDialog(false);
        setUserInForEdit("");
        setUsername();
        setFullname();
        setEmail();
        setGender();
        setCountry();
        setFaculty();
        setCourse();
        Swal.fire({
          title: "Thành công",
          text: "Cập nhật thông tin thành công",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
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
      course
    ) {
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
          image:
            "http://res.cloudinary.com/djhhzmcps/image/upload/v1710233045/aguoearcseozcitseocv.png",
          role: 1,
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
            setUsername();
            setFullname();
            setEmail();
            setGender();
            setCountry();
            setFaculty();
            setCourse();
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
              { title: "STT", dataIndex: "id" },
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

              // {
              //   title: "Vai trò",
              //   dataIndex: "role",
              //   render: (role.) => {
              //     return role === "owner"
              //       ? "Chủ xe"
              //       : role === "admin"
              //       ? "Người quản lý"
              //       : "Người thuê xe";
              //   },
              // },
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
                  Tạo
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
