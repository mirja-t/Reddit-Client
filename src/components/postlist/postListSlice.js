import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getSubredditData } from '../../utils/reddit';

export const loadPosts = createAsyncThunk(
  'postList/loadPosts',
  async (subredditPath) => {
    const url = 'https://www.reddit.com/';
    const posts = await getSubredditData(url, subredditPath)
    return posts
  }
)

export const postListSlice = createSlice({
  name: "postList",
  initialState: {
    posts: [],
    selectedId: null,
    isLoading: false,
    hasError: false
  },
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    }
  },
  extraReducers: {
    [loadPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
     },
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = [...action.payload];
      state.isLoading = false;
      state.hasError = false;
    },
    [loadPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
});
  
export const selectPosts = (state) => state.postList;
export const getSelectedId = (state) => state.postList.selectedId;

export const {
  setSelectedId
} = postListSlice.actions;

export default postListSlice.reducer;