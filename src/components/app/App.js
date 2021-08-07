import './App.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSubreddit } from './AppSlice.js';
import { PostList } from '../postlist/PostList';
import { SubredditList } from '../subredditList/SubredditList.js';


function App() {

  const subreddit = useSelector(selectSubreddit);

  return (
    <div id="wrapper">
      <SubredditList/>
      <PostList subredditPath={subreddit}/>
    </div>
  );
}

export default App;
