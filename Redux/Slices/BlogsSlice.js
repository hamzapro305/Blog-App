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
            image: "",
            Comments: [],
            id: ""
        },
    },
    reducers: {
        setBlog: (state, { payload }) => {
            state.Blog.title = payload.title
            state.Blog.description = payload.description
            state.Blog.content = payload.content
            state.Blog.Author = payload.Author
            state.Blog.createdAt = payload.createdAt
            state.Blog.image = payload.image
            state.Blog.id = payload.id
        },
        setBlogs: (state, { payload }) => {
            state.AllBlogs = payload;
        },
        setBlogComments: (state, { payload }) => {
            state.Blog.Comments = payload
        }
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
export const { setBlog, setBlogs, setBlogComments } = BlogsSlice.actions;
export default BlogsSlice;
