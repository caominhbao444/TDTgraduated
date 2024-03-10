import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  myPost: [],
};

//CallApiMyListPosts
export const CallApiMyListPosts = createAsyncThunk(
  "user/callApiMyListPosts",
  async function ({ headers, id }) {
    try {
      const apiMyPostsResponse = await axios.get(
        `http://localhost:1337/api/posts/?id=${id}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiMyPostsResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
  // return apiUserResponse;
);

const postsSlice = createSlice({
  name: "post",
  initialState,
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
      });
  },
});
export default postsSlice.reducer;
