import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSet: false,
};

const counterSlice = createSlice({
  name: "context",
  initialState: initialState,
  reducers: {
    setContext: (state) => {
      state.isSet = true;
    },
  },
});

export const { setContext } = counterSlice.actions;
export default counterSlice.reducer;
