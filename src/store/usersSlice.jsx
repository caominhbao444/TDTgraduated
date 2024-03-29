import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    value: 0,
    userDetail: {},
    listFriends: {},
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setUserDetails: (state, data) => {
      state.userDetail = data.payload;
    },
    setLogin: (state, data) => {
      localStorage.setItem("token", data.payload.jwt);
    },
    setLogout: (state, data) => {
      state.userDetail = {};
      localStorage.removeItem("token");
    },
  },
});

export const { increment, decrement, setUserDetails, setLogin, setLogout } =
  usersSlice.actions;

export default usersSlice.reducer;
