import './App.scss';
import React, { useState } from 'react';
import {PostList} from '../postlist/PostList';
import {SubredditList} from '../subredditList/SubredditList.js';


function App() {

  const [subreddit, setSubreddit] = useState('r/DesignPorn');

  const onSubredditChange = (subredditPath) => {
    setSubreddit(subredditPath)
  }

  return (
    <div id="wrapper">
      <SubredditList 
        onSubredditChange={onSubredditChange}
        subredditPath={subreddit}/>
      <PostList subredditPath={subreddit}/>
    </div>
  );
}

export default App;
