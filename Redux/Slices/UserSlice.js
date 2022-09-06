import { createSlice } from "@reduxjs/toolkit";

const UserSLice = createSlice({
    name: "Auth",
    initialState: {
        User: null,
        isLoggedIn: null,
    },
    reducers: {
        setUser: (state, { payload }) => {
            if (payload) {
                state.User = payload
                state.isLoggedIn = true;
            } else {
                state.User = null;
                state.isLoggedIn = false;
            }
        },
    },
});
export const { setUser } = UserSLice.actions;
export default UserSLice;
