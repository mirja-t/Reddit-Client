import './comment.scss';
import { formatDate } from '../../../../../utils/helperFunctions';
import { lazy } from 'react';

export const Comment = ({comment}) => {

    return (<div className="comment-container">
        <p className="comment-author author"><span className="name">{comment.author}</span> wrote {formatDate(comment.created_utc)} ago</p>
        {comment.body}
    </div>)
}