import {createSlice} from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        user: null,
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        selectUser: (state, action) => {
            state.user = action.payload.user;
        },
    },
});

export const {selectUser} = appSlice.actions;

export const getUser = (state) => state.app.user;

export default appSlice.reducer;
