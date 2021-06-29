import {createSlice} from '@reduxjs/toolkit';

export const postListSlice = createSlice({
    name: "postList",
    initialState: [],
    reducers: {
      todo1Name: (state, action) => {
        return state
      }
    }
  });
  
  export default postListSlice.reducer;