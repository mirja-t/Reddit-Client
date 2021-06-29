import React from 'react';
import './subreddit.scss';

export const Subreddit = ({onSubredditChange, name, path, active}) => {
    const classes = path === active ? 'subreddit active' : 'subreddit';
    const handleSubredditChange = () => {
        onSubredditChange(path)
    }
    return (
        <li className={ classes }>
            <a onClick={handleSubredditChange} href="#">
                <span className="subreddit-title">{name}</span>
                <span className="subreddit-pathname">{path}</span>
            </a>
        </li>
    );
}