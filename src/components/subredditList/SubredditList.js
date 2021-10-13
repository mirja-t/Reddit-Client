

import './subredditList.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSubreddit } from '../app/AppSlice';
import { Subreddit } from './subreddit/Subreddit.js';
import { useDispatch } from 'react-redux';
import { setSubreddit } from '../app/AppSlice';
import { loadPosts } from '../postlist/postListSlice';

export const SubredditList = () => {

    const subreddits = [
    {name: 'Design', path: 'r/DesignPorn'}, 
    {name: 'Data is beautiful', path: 'r/dataisbeautiful'}, 
    {name: 'Battlestations', path: 'r/battlestations'}, 
    {name: 'EarthPorn', path: 'r/EarthPorn'},
    {name: 'I Took a Picture', path: 'r/itookapicture'},
    {name: 'Amoled Backgrounds', path: 'r/AmoledBackgrounds'},
    {name: 'Imaginary Monsters', path: 'r/ImaginaryMonsters'}];

    const subredditActive = useSelector(selectSubreddit);
    const activeIndex = subreddits.indexOf(subreddits.find(el => Object.values(el).includes(subredditActive)));
    const [open, setOpen] = useState(false);
    const linkStyle = {transform: open ? `translateY(0%)` : `translateY(${activeIndex * -100}%)`}
    const linkHeight = '3rem';
    const navHeight = open ? `calc( ${subreddits.length} * ${linkHeight} )` : linkHeight;

    const toggle = () => {
      setOpen(prev => !prev)
    }

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSubreddit('r/DesignPorn'));
        dispatch(loadPosts('r/DesignPorn'));
    },[dispatch]);
    
    return (
      <ul 
        className="subredditlist"
        onClick={toggle}
        style={{ height: navHeight }}
        >
        {subreddits.map(subreddit => (
          <Subreddit 
            key={subreddit.path} 
            name={subreddit.name} 
            path={subreddit.path}
            active={subredditActive}
            style={linkStyle}
          />
        ))}
      </ul>
    );
}