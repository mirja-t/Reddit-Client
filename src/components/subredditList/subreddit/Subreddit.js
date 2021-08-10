import './subreddit.scss';
import { useDispatch } from 'react-redux';
import { setSubreddit } from '../../app/AppSlice';

export const Subreddit = ({name, path, active, style}) => {

    const dispatch = useDispatch();
    const classes = path === active ? 'subreddit active' : 'subreddit';
    
    return (
        <li 
            className={ classes }
            style={ style }>
            <div 
                onClick={ ()=>{ dispatch(setSubreddit(path)) }}
                className="link">
                <span className="subreddit-title">{name}</span>
                <span className="subreddit-pathname">{path}</span>
            </div>
        </li>
    );
}