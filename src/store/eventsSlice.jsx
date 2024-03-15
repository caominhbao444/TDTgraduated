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
//CallApiMyListEvents
export const CallApiMyListEvents = createAsyncThunk(
  "events/callApiMyListEvents",
  async function ({ headers, id }) {
    try {
      const apiMyListEventsResponse = await axios.get(
        `http://localhost:1337/api/events?id=${id}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      console.log(apiMyListEventsResponse.data);
      return apiMyListEventsResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);
const eventsSlice = createSlice({
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
      })
      .addCase(CallApiMyListEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CallApiMyListEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myListEvents = action.payload;
      })
      .addCase(CallApiMyListEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default eventsSlice.reducer;
