import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: "app",
    initialState: { 
      subreddit: 'r/DesignPorn'
    },
    reducers: {
      setSubreddit: (state, action) => {
        state.subreddit = action.payload
      }
    }
  });

export const selectSubreddit = (state) => state.app.subreddit;

export const {
    setSubreddit
} = appSlice.actions;

 export default appSlice.reducer;
