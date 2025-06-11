import { configureStore } from "@reduxjs/toolkit";
import contextSlice from "./redux/contextSlice";

export const store = configureStore({
  reducer: {
    context: contextSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
