import React, {useRef, useState, useEffect} from 'react';
import './post.scss';
import { CommentList } from './commentList/CommentList'
import { formatNumber, formatDate, shortenTitle } from '../../../utils/helperFunctions';

export const Post = ({setGrid, selectPost, selected, post, subredditPath, index, offset}) => {

    const cardClasses = selected ? 'card card-selected' : 'card';
    const num_comments = post.num_comments;
    const upvotes = post.ups;
    const [translateY, setTranslateY] = useState({});

    const cardRef = useRef(null);
    
    const handleClick = () => {
        selectPost(post.id)
    }
    
    useEffect(()=>{
        const card = {
            id: index,
            width: cardRef.current.offsetWidth,
            height: cardRef.current.offsetHeight
        }
        if(!selected) {
            setGrid(card, index);
            console.log('set translate');
        }
        
    },[subredditPath])
    
    useEffect(()=>{
        if (offset !== undefined) {
            console.log('set translate')
            setTranslateY({ 'transform': `translateY(-${offset.translateY}px)` })
        }
    },[offset])

    return (
    <li className={cardClasses} onClick={handleClick} ref={cardRef} style={ translateY }>
        <div 
            className="card-details" 
            title={'show details: ' + shortenTitle(post.title, 20)}
        >
            
            <div>
                { post.url && (<img src={post.url} width={post.img_width} height={post.img_height} alt=""/>) }
                <div className='card-body'>
                    <p className="post-author author">Posted by <span className="name">{post.author}</span> {formatDate(post.created_utc)} ago</p>
                    <h2 className="title">{ selected ? post.title : shortenTitle(post.title, 50)}</h2>
                </div>
                <div className="card-footer">
                    <div className="comments">
                        {formatNumber(num_comments)}&nbsp;Comments
                    </div>
                    <div className="upvotes">
                        {formatNumber(upvotes)}&nbsp;Upvotes
                    </div>
                </div>
                {selected && ( <CommentList postId={post.id} subredditPath={subredditPath} />)}
            </div>
        </div>
    </li>)
}