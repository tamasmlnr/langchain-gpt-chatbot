import { createSlice } from "@reduxjs/toolkit";
import { type MessageType } from "../types/Message";

const initialState: { messages: MessageType[] } = {
  messages: [
    {
      role: "assistant",
      content: "Hello! How can I assist you today?",
      timestamp: Date.now(),
    },
  ],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      console.log("Adding message:", payload);
      state.messages = state.messages.concat(payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
