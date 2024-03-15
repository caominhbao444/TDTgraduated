import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listEvents: [],
  myListEvents: [],
};

//CallApiListEvents
export const CallApiListEvents = createAsyncThunk(
  "events/callApiListEvents",
  async function ({ headers }) {
    try {
      const apiListEventsResponse = await axios.get(
        `http://localhost:1337/api/events`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      console.log(apiListEventsResponse.data);
      return apiListEventsResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
const postsSlice = createSlice({
  name: "events",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(CallApiListEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiListEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listEvents = action.payload;
      })
      .addCase(CallApiListEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default postsSlice.reducer;
