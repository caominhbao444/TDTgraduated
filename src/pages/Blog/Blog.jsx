import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import SecondAside from "../../components/HomeItems/SecondAside/SecondAside";
import CreateBlog from "../../components/Blog/CreateBlog";
import MyBlogs from "../../components/Blog/MyBlogs";
import { useSelector } from "react-redux";
const Blog = () => {
  const [content, setContent] = useState("");
  const userDetail = useSelector((state) => state.user2.myListFriends);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(userDetail.role.id === 3 ? 0 : 1);
  const editor = useRef(null);
  const handleActiveTab = (active) => {
    setActiveTab(active);
  };

  const handleCreateBlogSuccess = () => {
    setActiveTab(1); // Activate the second tab
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-9  min-h-screen bg-[#f7f7f7] ">
      <main className="md:col-span-7 flex flex-col md:gap-8 gap-4 mt-[42px] md:mt-[58px] ">
        <div className="flex md:flex-row flex-col w-full h-full">
          <div className="md:w-1/5 w-full bg-white flex md:flex-col md:justify-start md:items-center gap-1 md:sticky md:top-[58px] md:h-[calc(100vh-58px)]">
            {userDetail.role.id === 3 && (
              <div
                className={`w-full p-2 text-center cursor-pointer md:border-r-2 ${
                  activeTab === 0
                    ? "border-mainColor text-black font-medium"
                    : "text-textLightColor"
                }`}
                onClick={() => handleActiveTab(0)}
              >
                Tạo Blog
              </div>
            )}

            <div
              className={`w-full p-2 text-center cursor-pointer md:border-r-2 ${
                activeTab === 1
                  ? "border-mainColor text-black font-medium"
                  : "text-textLightColor"
              }`}
              onClick={() => handleActiveTab(1)}
            >
              Danh sách Blog
            </div>
          </div>
          <div className="md:w-4/5 w-full h-full md:p-4">
            {activeTab === 0 && (
              <CreateBlog onSuccess={handleCreateBlogSuccess} />
            )}

            {activeTab === 1 && <MyBlogs />}
          </div>
        </div>
      </main>
      <aside className="bg-white md:col-span-2 hidden md:flex flex-col  sticky top-[58px]  h-[calc(100vh-58px)]">
        <SecondAside />
      </aside>
    </div>
  );
};

export default Blog;
