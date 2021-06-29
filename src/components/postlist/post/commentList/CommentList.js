import React, { useEffect, useState } from 'react';
import { getPostComments } from '../../../../utils/reddit';
import {Comment } from './comment/Comment';
import './commentList.scss';

export const CommentList = ({postId, subredditPath}) => {
    const [comments, setComments] = useState([]);

    const getComments = (id, subredditPath) => {
        getPostComments(id, subredditPath).then(response => {
            setComments(response)
        })
    }

    useEffect(() => {
        console.log('CommentList:',postId, subredditPath)
        getComments(postId, subredditPath);
    }, []);
    
    return (<div className="card-body comment-list">
        {comments.length > 0 && (<h5>Comments</h5>)}
        {comments.map(comment => (<Comment key={comment.id} comment={comment}/>))}
    </div>)
}