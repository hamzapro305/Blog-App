import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BlogApi from "../../Utils/BlogApi";

export const getAllBlogs = createAsyncThunk(
    "Blogs/getAllBlogs",
    async (_, { rejectWithValue }) => {
        try {
            return await BlogApi.getAllBlogs();
        } catch (error) {
            return rejectWithValue(null);
        }
    }
);

const BlogsSlice = createSlice({
    name: "Blogs",
    initialState: {
        AllBlogs: [],
        Blog: {
            title: "",
            description: "",
            Author: "",
            content: "",
            createdAt: 0,
        },
    },
    reducers: {
        setBlog: (state, { payload }) => {
            state.Blog = payload;
        },
        setBlogs: (state, { payload }) => {
            state.AllBlogs = payload;
        },
    },
    extraReducers: {
        [getAllBlogs.fulfilled]: (state, { payload }) => {
            state.AllBlogs = payload;
        },
        [getAllBlogs.rejected]: (state, { payload }) => {
            state.AllBlogs = payload;
        },
    },
});
export const { setBlog, setBlogs } = BlogsSlice.actions;
export default BlogsSlice;
