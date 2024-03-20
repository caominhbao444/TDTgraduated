import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CallApiDeleteBlogs, CallApiListBlogs } from "../../store/blogSlice";
import parse from "html-react-parser";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import JoditEditor from "jodit-react";
import axios from "axios";
const MyBlogs = () => {
  const authToken = localStorage.getItem("token");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editBlog, setEditBlog] = useState({});
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const listBlogs = useSelector((state) => state.blogs.listBlogs);
  const userDetail = useSelector((state) => state.user2.myListFriends);
  const editor = useRef(null);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (authToken) {
      dispatch(
        CallApiListBlogs({
          headers: { authorization: `Bearer ${authToken}` },
        })
      ).then(() => setIsLoading(false));
    }
  }, [authToken, dispatch]);
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `Ngày đăng: ${day}/${month}/${year}`;
  };
  const handleDeleteBlog = (id) => {
    if (id) {
      dispatch(
        CallApiDeleteBlogs({
          headers: { authorization: `Bearer ${authToken}` },
          id: id,
        })
      ).then(() =>
        Swal.fire({
          title: "Thành công",
          text: "Xóa Blog thành công",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          dispatch(
            CallApiListBlogs({
              headers: { authorization: `Bearer ${authToken}` },
            })
          );
        })
      );
    }
  };
  const handleOpenEdit = (blog) => {
    setEditBlog(blog);
    setOpen(true);
  };
  const handleEdit = () => {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + "/blogs/" + editBlog.id,
        {
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setOpen(false);
        Swal.fire({
          title: "Thành công",
          text: "Cập nhật blog thành công",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() =>
          dispatch(
            CallApiListBlogs({
              headers: { authorization: `Bearer ${authToken}` },
            })
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (editBlog && open) {
      setContent(editBlog.content);
    }
  }, [editBlog, open]);
  return (
    <div className="h-full w-full bg-white flex flex-col gap-4 md:p-4">
      <div className="flex justify-between items-center md:p-2 p-4">
        <h3 className="text-[18px] font-semibold">Danh sách Blog</h3>
      </div>
      {!isLoading &&
        listBlogs &&
        listBlogs.map((blog) => {
          return (
            <div
              key={blog.id}
              className="flex flex-col gap-4 border bg-[#f7f7f7]"
            >
              <div className="p-4 border-b">{parse(blog.content)}</div>
              <div className="flex justify-end items-center px-4 text-textLightColor">
                {formatDate(blog.createdAt)}
              </div>
              {userDetail.role.id === 3 && (
                <div className="flex justify-end items-center px-4 gap-2  pb-4">
                  <button
                    className="px-3 py-2 bg-red-700 text-white hover:bg-white hover:text-red-700 border border-red-700 rounded-lg"
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    Xóa Blog
                  </button>
                  <button
                    className="px-3 py-2 bg-mainColor text-white hover:bg-white hover:text-mainColor border border-mainColor rounded-lg"
                    onClick={() => handleOpenEdit(blog)}
                  >
                    Chỉnh sửa
                  </button>
                </div>
              )}
            </div>
          );
        })}
      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            Chỉnh sửa nội dung Blog
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <div className=" flex flex-col gap-3">
              <div className="flex flex-col w-full justify-center items-start">
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                  className=""
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleClose}
              className="px-2 py-2 bg-white rounded-md text-mainColor border border-mainColor"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleEdit}
              className="px-2 py-2 bg-mainColor rounded-md text-white"
            >
              Cập nhật
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default MyBlogs;
