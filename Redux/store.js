import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import BlogsSlice from "./Slices/BlogsSlice";
import GlobalVariableSlice from "./Slices/GlobalVarialbesSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            [GlobalVariableSlice.name]: GlobalVariableSlice.reducer,
            [BlogsSlice.name]: BlogsSlice.reducer,
        },
    });

export const wrapper = createWrapper(makeStore);
