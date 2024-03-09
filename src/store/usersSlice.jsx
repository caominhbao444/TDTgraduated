import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0,
    userDetail: {},
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setUserDetails: (state, data) => {
      console.log(data.payload)
      state.userDetail = data.payload
    },
    setLogin: (state, data) => {
      localStorage.setItem('token', data.payload.jwt)
    }
  }
});

export const { increment, decrement, setUserDetails, setLogin } = usersSlice.actions;

export default usersSlice.reducer;