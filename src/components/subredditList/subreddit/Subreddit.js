import './subreddit.scss';
import { useDispatch } from 'react-redux';
import { setSubreddit } from '../../app/AppSlice';
import { loadPosts } from '../../postlist/postListSlice';

export const Subreddit = ({name, path, active, style}) => {

    const dispatch = useDispatch();
    const classes = path === active ? 'subreddit active' : 'subreddit';

    const handleClick = () => {
        dispatch(setSubreddit(path));
        dispatch(loadPosts(path));
    }

    return (
        <li 
            className={ classes }
            style={ style }>
            <div 
                onClick={ handleClick }
                className="link">
                <span className="subreddit-title">{name}</span>
                <span className="subreddit-pathname">{path}</span>
            </div>
        </li>
    );
}