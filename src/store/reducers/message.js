import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      console.log(action.payload);
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      console.log(action.payload);
      state.messages = [...state.messages, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
