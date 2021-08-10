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
    grid: [],
    offsets: [],
    selectedId: null,
    isLoading: false,
    hasError: false
  },
  reducers: {
    resetGrid: (state) => {
      state.grid = []
    },
    initCard: (state, action) => {
      state.grid[action.payload.id] = action.payload;
    },
    setOffsets: (state, action) => {
      state.offsets = [...action.payload]
    },
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
export const selectGrid = (state) => state.postList.grid;
export const getOffsets = (state) => state.postList.offsets;
export const getSelectedId = (state) => state.postList.selectedId;

export const {
  resetGrid,
  initCard,
  setOffsets,
  setSelectedId
} = postListSlice.actions;

export default postListSlice.reducer;