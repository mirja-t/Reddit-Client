
import React from 'react';
import {Subreddit} from './subreddit/Subreddit.js';
import './subredditList.scss';

export const SubredditList = ({subredditPath, onSubredditChange}) => {

  
      const subreddits = [
      {name: 'Design', path: 'r/DesignPorn'}, 
      {name: 'Data is beautiful', path: 'r/dataisbeautiful'}, 
      {name: 'Battlestations', path: 'r/battlestations'}, 
      {name: 'EarthPorn', path: 'r/EarthPorn'},
      {name: 'I Took a Picture', path: 'r/itookapicture'},
      {name: 'Amoled Backgrounds', path: 'r/AmoledBackgrounds'},
      {name: 'Imaginary Monsters', path: 'r/ImaginaryMonsters'},
      {name: 'High Quality GIFs', path: 'r/HighQualityGIFs'},
      {name: 'Web Design', path: 'r/web_design'}];
    
    return (
      <aside>
        <h2>Subreddit list</h2>
        <ul className="subredditlist">
          {subreddits.map((subreddit) => (
            <Subreddit 
              key={subreddit.path} 
              name={subreddit.name} 
              path={subreddit.path}
              onSubredditChange={onSubredditChange}
              active={subredditPath}
            />
          ))}
        </ul>
      </aside>
    );
}