import './search.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSubreddit } from '../app/AppSlice';
import { loadPosts } from '../postlist/postListSlice';

export const Search = () => {

    const [val, setVal] = useState('');

    const dispatch = useDispatch();

    const handleChange = ({target}) => {
        const inputVal = target.value;
        setVal(inputVal);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const subreddit = `r/${val}`;
        dispatch(setSubreddit(subreddit));
        dispatch(loadPosts(subreddit));
        setVal('');
    }
    
    return (
        <form id="search" action="#" onSubmit={ handleSubmit }>
            <input name="subreddit" value={val} placeholder="Subreddit" type="search" onChange={handleChange}/>
            <input type="submit" value="" name="action"/>
        </form>
    );
}