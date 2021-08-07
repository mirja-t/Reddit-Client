import React from 'react';
import './subreddit.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSubreddit, selectSubreddit } from '../../app/AppSlice';

export const Subreddit = ({name, path}) => {

    const dispatch = useDispatch();
    const currentPath = useSelector(selectSubreddit);
    const classes = path === currentPath ? 'subreddit active' : 'subreddit';

    return (
        <li className={ classes }>
            <a onClick={ ()=>{ dispatch(setSubreddit(path)) }} href="#">
                <span className="subreddit-title">{name}</span>
                <span className="subreddit-pathname">{path}</span>
            </a>
        </li>
    );
}