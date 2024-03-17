import SecondAside from "../../components/HomeItems/SecondAside/SecondAside";
import { Card } from "@mui/material";
import PostContainer from "../../components/HomeItems/PostContainer/PostContainer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CallApiPostId } from "../../store/postsSlice";
import axios from "axios";

const Post = () => {
  const { id } = useParams();
  const authToken = localStorage.getItem("token");
  const postId = useSelector((state) => state.post.postId);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(
        CallApiPostId({
          headers: { authorization: `Bearer ${authToken}` },
          id: id,
        })
      ).then(() => setIsLoading(false));
    }
  }, [id, dispatch, authToken]);
  useEffect(() => {
    if (postId) {
      console.log("PostId", postId);
    }
  }, [postId, dispatch, authToken]);
  console.log("id Parma", id);
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 md:gap-8 min-h-screen bg-[#f7f7f7] ">
      <main className="md:col-span-7 flex flex-col md:gap-8 gap-4 md:py-4 mt-[42px] md:mt-[58px] md:pl-8">
        {postId && !isLoading && (
          <Card className="w-full h-full bg-white">
            <PostContainer post={postId} />
          </Card>
        )}
      </main>
      <aside className="bg-white md:col-span-2 hidden md:flex flex-col  sticky top-[58px]  h-[calc(100vh-58px)]">
        <SecondAside />
      </aside>
    </div>
  );
};

export default Post;
