import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import postsSlice from "./postsSlice";

import usersSlice2 from "./users2Slice";
import eventsSlice from "./eventsSlice";
export const store = configureStore({
  reducer: {
    user: usersSlice,
    user2: usersSlice2,
    post: postsSlice,
    events: eventsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
  devTools: true,
});
