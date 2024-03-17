import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  myPost: [],
  postId: [],
  myDetailsPost: [],
};

//CallApiMyListPosts
export const CallApiMyListPosts = createAsyncThunk(
  "user/callApiMyListPosts",
  async function ({ headers, id }) {
    try {
      const apiMyPostsResponse = await axios.get(
        `http://localhost:1337/api/posts?id=${id}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      console.log(apiMyPostsResponse.data);
      return apiMyPostsResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
//CallApiMyListPosts post trong details
export const CallApiDetailsListPosts = createAsyncThunk(
  "user/callApiDetailListPosts",
  async function ({ headers, id }) {
    try {
      const apiDetailListPosts = await axios.get(
        `http://localhost:1337/api/posts?id=${id}&details=true`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      console.log(apiDetailListPosts.data);
      return apiDetailListPosts.data;
    } catch (err) {
      console.log(err);
    }
  }
);
//CallApiPostId
export const CallApiPostId = createAsyncThunk(
  "post/callApiPostId",
  async function ({ headers, id }) {
    try {
      const apiPostIdResponse = await axios.get(
        `http://localhost:1337/api/posts/${id}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiPostIdResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetStateToInitial: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CallApiMyListPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiMyListPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myPost = action.payload;
      })
      .addCase(CallApiMyListPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiPostId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiPostId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postId = action.payload;
      })
      .addCase(CallApiPostId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiDetailsListPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiDetailsListPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myDetailsPost = action.payload;
      })
      .addCase(CallApiDetailsListPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetStateToInitial } = postsSlice.actions;
export default postsSlice.reducer;
