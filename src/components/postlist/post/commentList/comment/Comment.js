import './comment.scss';
import { formatDate } from '../../../../../utils/helperFunctions';
import { CommentReplies } from './CommentReplies';

export const Comment = ({comment}) => {
    return (<div className="comment-container">
        <p className="comment-author author"><span className="name">{comment.author}</span> wrote {formatDate(comment.created_utc)} ago</p>
        {comment.body}
        {comment.replies && <CommentReplies replies={comment.replies}/>}
    </div>)
}