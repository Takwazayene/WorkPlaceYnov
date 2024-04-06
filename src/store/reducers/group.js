import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
    name: "group",
    initialState: {groups: [], groupsOwned: [], groupsMember: {}},
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        setGroupsOwned: (state, action) => {
            state.groupsOwned = action.payload;
        },
        setGroupsMember: (state, action) => {
            state.groupsMember = action.payload;
        },
        sendGroup: (state, action) => {
            Socket.emit("emit group", action.payload);
          },
    }
});

export const { setGroups, setGroupsOwned, setGroupsMember, sendGroup } = groupSlice.actions;

export default groupSlice.reducer;