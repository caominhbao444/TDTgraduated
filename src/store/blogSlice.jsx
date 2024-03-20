import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listBlogs: [],
  deleteBlog: [],
};

//CallApiListBlogs
export const CallApiListBlogs = createAsyncThunk(
  "blogs/callApiListBlogs",
  async function ({ headers }) {
    try {
      const apiListBlogsResponse = await axios.get(
        `http://localhost:1337/api/blogs`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiListBlogsResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
//CallApiDeleteBlogs
export const CallApiDeleteBlogs = createAsyncThunk(
  "blogs/callApiDeleteBlogs",
  async function ({ headers, id }) {
    try {
      const apiDeleteBlogsResponse = await axios.delete(
        `http://localhost:1337/api/blogs/${id}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiDeleteBlogsResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(CallApiListBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiListBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listBlogs = action.payload;
      })
      .addCase(CallApiListBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiDeleteBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiDeleteBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteBlog = action.payload;
      })
      .addCase(CallApiDeleteBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default blogSlice.reducer;
