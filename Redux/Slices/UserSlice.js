import { createSlice } from "@reduxjs/toolkit";

const UserSLice = createSlice({
    name: "Auth",
    initialState: {
        User: null,
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, { payload }) => {
            if (payload) {
                state.User = payload
                state.isLoggedIn = true;
                window.isLoggedIn = true;
            } else {
                state.User = null;
                state.isLoggedIn = false;
                window.isLoggedIn = false;
            }
        },
    },
});
export const { setUser } = UserSLice.actions;
export default UserSLice;
