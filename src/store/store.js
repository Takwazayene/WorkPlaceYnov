import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import authSlice from "./reducers/auth";
import groupSlice from "./reducers/group";
import loadingSlice from "./reducers/loading";
import threadSlice from "./reducers/thread";
import messageSlice from "./reducers/message";

export default configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    group: groupSlice,
    loading: loadingSlice,
    thread: threadSlice,
    message: messageSlice,
  },
});
