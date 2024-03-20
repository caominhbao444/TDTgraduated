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
import { CallApiAllListPostByAdmin } from "../../store/postsSlice";
const ManagePosts = () => {
  const [searchText, setSearchText] = useState("");
  const authToken = localStorage.getItem("token");
  const [listOrder, setListOrder] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const paginationConfig = {
    className: "centered-pagination",
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const listAllPosts = useSelector((state) => state.post.listAllPosts);
  const onDeleteUser = (record) => {
    // dispatch(
    //   CallApiDeleteUser({
    //     headers: { authorization: `Bearer ${authToken}` },
    //     id: record.id,
    //   })
    // )
    //   .then(() => {
    //     Swal.fire({
    //       title: "Thành công!",
    //       text: "Xóa tài khoản thành công!",
    //       icon: "success",
    //       confirmButtonColor: `#1877f2`,
    //       confirmButtonText: "Đồng ý",
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         dispatch(
    //           CallApiListAllFriends({
    //             headers: { authorization: `Bearer ${authToken}` },
    //           })
    //         ); // Dispatch action to reload friends list
    //       }
    //     });
    //   })
    //   .catch(() => {
    //     Swal.fire({
    //       title: "Thất bại!",
    //       text: "Vui lòng chờ kiểm tra thông tin từ quản trị viên!",
    //       icon: "error",
    //       confirmButtonColor: `#1877f2`,
    //       confirmButtonText: "Xác nhận",
    //     });
    //   });
    axios
      .delete(import.meta.env.VITE_APP_BASE_URL + "/posts/" + record, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Thành công",
          text: "Xóa bài viết thành công.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          dispatch(
            CallApiAllListPostByAdmin({
              headers: { authorization: `Bearer ${authToken}` },
            })
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (listAllPosts && !loading) {
      setListOrder([...listAllPosts].sort((a, b) => a.id - b.id));
    }
  }, [listAllPosts, loading]);

  useEffect(() => {
    if (authToken) {
      dispatch(
        CallApiAllListPostByAdmin({
          headers: { authorization: `Bearer ${authToken}` },
        })
      ).then(() => setLoading(false));
    }
  }, [authToken, dispatch]);
  return (
    <div className="grid grid-cols-1 min-h-screen bg-[#f7f7f7] ">
      <main className="md:col-span-7 flex flex-col md:gap-4 gap-4 md:py-4 mt-[42px] md:mt-[58px] md:px-8">
        <h3 className="text-center md:text-[20px] md:font-bold">
          Quản lý bài viết
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

        {listOrder && (
          <Table
            className="text-center"
            columns={[
              {
                title: "STT",
                align: "center",
                render: (text, record, index) => index + 1,
              },
              {
                title: "Nội dung",
                dataIndex: "content",
                filteredValue: [searchText],
                onFilter: (value, record) => {
                  return (
                    String(record.content)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.author.fullname)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.isPublic)
                      .toLowerCase()
                      .includes(value.toLowerCase())
                  );
                },
              },
              {
                title: "Tác giả",
                align: "center",
                dataIndex: "author",
                render: (author) => {
                  return author.fullname ? author.fullname : "";
                },
              },

              {
                title: "Trạng thái",
                dataIndex: "isPublic",
                align: "center",
                render: (isPublic) => {
                  return isPublic ? "Công khai" : "Bạn bè";
                },
              },
              {
                title: "Lượt thích",
                dataIndex: "liked",
                align: "center",
                render: (liked) => {
                  return liked && liked.length
                    ? liked.length + " lượt thích"
                    : "0 lượt thích";
                },
              },
              {
                title: "Lượt bình luận",
                dataIndex: "comments",
                align: "center",
                render: (comments) => {
                  return comments && comments.length
                    ? comments.length + " bình luận"
                    : "0 bình luận";
                },
              },
              //   {
              //     title: "Địa chỉ",
              //     dataIndex: "country",
              //   },

              //   {
              //     title: "Vai trò",
              //     dataIndex: "role",
              //     render: (role) => {
              //       return role.id === 3 ? "Admin" : "User";
              //     },
              //   },
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
                        <DeleteOutlined
                          style={{
                            color: "red",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => onDeleteUser(record.id)}
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
      </main>
    </div>
  );
};

export default ManagePosts;
