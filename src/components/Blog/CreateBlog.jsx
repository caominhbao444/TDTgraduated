import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const CreateBlog = ({ onSuccess }) => {
  const [content, setContent] = useState("");
  const userDetail = useSelector((state) => state.user2.myListFriends);
  const editor = useRef(null);
  const createBlog = (e) => {
    e.preventDefault();
    if (content && userDetail) {
      axios
        .post(
          import.meta.env.VITE_APP_BASE_URL + `/blogs`,
          {
            content: content,
            author: userDetail.id,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          Swal.fire({
            title: "Thành công",
            text: "Tạo Blog thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          setContent("");
          onSuccess();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="h-full w-full bg-white flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center md:p-2 p-4">
        <h3 className="text-[18px] font-semibold">Tạo Blog</h3>
      </div>
      <div className="w-full ">
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
          className=""
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          className="px-2 py-2 bg-mainColor hover:bg-white border border-mainColor text-white hover:text-mainColor rounded-lg font-medium"
          onClick={createBlog}
        >
          Đăng Blog
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
