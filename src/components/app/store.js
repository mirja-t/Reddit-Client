import { configureStore } from "@reduxjs/toolkit";
import { postListSlice } from '../postlist/postListSlice';

export default configureStore({
    reducer: {
        postList: postListSlice
    },
  });