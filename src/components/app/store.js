import { configureStore } from "@reduxjs/toolkit";
import appReducer from "AppSlice";
import postListReducer from '../postlist/postListSlice';

export default configureStore({
    reducer: {
        app: appReducer,
        postList: postListReducer
    },
});