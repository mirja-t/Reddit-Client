import React from 'react';

export const Subreddit = ({name, path, active}) => {
    const classes = active ? 'subreddit active' : 'subreddit';
    return (
        <li className={ classes }>
            <a href="#">
                <span className="subreddit-title">{name}</span>
                <span>{path}</span>
            </a>
        </li>
    );
}