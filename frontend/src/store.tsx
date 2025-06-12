import { configureStore } from "@reduxjs/toolkit";
import contextSlice from "./redux/contextSlice";
import messagesSlice from "./redux/messagesSlice";

export const store = configureStore({
  reducer: {
    context: contextSlice,
    messages: messagesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
