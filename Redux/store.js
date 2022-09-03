import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import BlogsSlice from "./Slices/BlogsSlice";
import GlobalVariableSlice from "./Slices/GlobalVarialbesSlice";
import UserSLice from "./Slices/UserSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            [GlobalVariableSlice.name]: GlobalVariableSlice.reducer,
            [BlogsSlice.name]: BlogsSlice.reducer,
            [UserSLice.name]: UserSLice.reducer,
        },
    });

export default makeStore();

export const wrapper = createWrapper(makeStore);
