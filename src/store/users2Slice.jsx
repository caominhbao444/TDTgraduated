import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  inforUser: [],
  listFriends: [],
  updateUser: [],
  forgotPassword: [],
  logout: [],
  listAllFriends: [],
};
//CallApiInforUser
export const CallApiInforUser = createAsyncThunk(
  "user2/callApiInforUser",
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
  "user2/callApiMyListFriends",
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
//CallApiUpdateUser
export const CallApiUpdateUser = createAsyncThunk(
  "user2/callApiUpdateUser",
  async function ({ headers, userId, data }) {
    try {
      const apiUpdateUserResponse = await axios.put(
        `http://localhost:1337/api/user-details/updateUser/${userId}`,
        data,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiUpdateUserResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
//CallApiForgotPassword
export const CallApiForgotPassword = createAsyncThunk(
  "user2/callApiForgotPassword",
  async function ({ headers, email }) {
    try {
      const apiForgotPasswordResponse = await axios.post(
        `http://localhost:1337/api/forgot-password`,
        {
          email: email,
        },
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiForgotPasswordResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
//CallApiLogout
export const CallApiLogout = createAsyncThunk(
  "user2/callApiLogout",
  async function ({ headers }) {
    try {
      const apiLogoutResponse = await axios.put(
        `http://localhost:1337/api/auth/logout`,

        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiLogoutResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
//CallApiListAllFriends
export const CallApiListAllFriends = createAsyncThunk(
  "user2/callApiListAllFriends",
  async function ({ headers }) {
    try {
      const apiListAllFriendsResponse = await axios.get(
        `http://localhost:1337/api/user-details/getAllUsers`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiListAllFriendsResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
const usersSlice2 = createSlice({
  name: "user2",
  initialState,
  reducers: {
    resetUserStateToInitial: (state) => {
      return initialState;
    },
  },
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
      })
      .addCase(CallApiUpdateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateUser = action.payload;
      })
      .addCase(CallApiUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiForgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forgotPassword = action.payload;
      })
      .addCase(CallApiForgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(CallApiListAllFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiListAllFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listAllFriends = action.payload;
      })
      .addCase(CallApiListAllFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetUserStateToInitial } = usersSlice2.actions;
export default usersSlice2.reducer;
