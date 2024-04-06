import { createSlice } from "@reduxjs/toolkit";

const threadSlice = createSlice({
  name: "thread",
  initialState: {
    threads: [],
    current: null,
  },
  reducers: {
    setThreads: (state, action) => {
      console.log(action.payload);
      state.threads = action.payload;
    },
    deleteFromThreads: (state, action) => {
      state.threads = state.threads.filter(
        (thread) => thread.id !== action.payload.id
      );
    },
    setCurrentThread: (state, action) => {
      state.current = action.payload;
    },
    sendThreads: (state, action) => {
      Socket.emit("emit threads", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setThreads, deleteFromThreads, setCurrentThread,sendThreads } =
  threadSlice.actions;

export default threadSlice.reducer;
