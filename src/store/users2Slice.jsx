import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  inforUser: [],
  listFriends: [],
};
//CallApiInforUser
export const CallApiInforUser = createAsyncThunk(
  "user/callApiInforUser",
  async function ({ headers, id }) {
    try {
      const apiInforUserResponse = await axios.get(
        `http://localhost:1337/api/user-details?id=${id}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiInforUserResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
//CallApiMyListFriends
export const CallApiMyListFriends = createAsyncThunk(
  "user/callApiMyListFriends",
  async function ({ headers, id }) {
    try {
      const apiListFriendsResponse = await axios.get(
        `http://localhost:1337/api/friend-list/${id}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiListFriendsResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const usersSlice2 = createSlice({
  name: "user2",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(CallApiMyListFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiMyListFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listFriends = action.payload;
      })
      .addCase(CallApiMyListFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiInforUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiInforUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inforUser = action.payload;
      })
      .addCase(CallApiInforUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default usersSlice2.reducer;
