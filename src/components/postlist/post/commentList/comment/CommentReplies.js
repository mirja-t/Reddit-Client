import {Comment} from './Comment';

export const CommentReplies = ({replies: {data: {children: comments}}}) => {
    return (<ul className="comment-replies">
            {comments.map(({data: comment}, i) => (
                <li key={i}>
                    <Comment comment={comment}/>
                </li>
            ))}
        </ul>)
}