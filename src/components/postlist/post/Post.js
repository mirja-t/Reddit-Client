import './post.scss';
import React, {
    useState, 
    useEffect,
    useCallback
} from 'react';
import { 
    useSelector, 
    useDispatch 
} from 'react-redux';
import { 
    motion 
} from "framer-motion";
import { buttonTransition } from '../../app/transitions';
import { debounce } from '../../../utils/debounce.js';
import { CommentList } from './commentList/CommentList';
import { 
    getOffsets,
    setSelectedId 
} from '../postListSlice';
import { initCard } from '../postListSlice';
import { 
    formatNumber, 
    formatDate, 
    shortenTitle 
} from '../../../utils/helperFunctions';

export const Post = ({selected, post, subredditPath, index}) => {

    const dispatch = useDispatch();

    const offsets = useSelector(getOffsets);
    const cardClasses = selected ? 'card card-selected' : 'card';
    const num_comments = post.num_comments;
    const upvotes = post.ups;
    const postTitle = post.title ? post.title : '';
    const imgRegEx = /(.jpg|.gif$|.jpeg|.png|.webp)/;
    const isImg = imgRegEx.test(post.url);
    const urlRegEx = /https?:\/\/\w{0,3}\.?\w+\.\w+/;
    const url = post.url.match(urlRegEx);
    const fileRegEx = /(.*)\?width=/;
    const strRegEx = /s=(.*)/;
    const file = post.preview?.url.match(fileRegEx)[1];
    const str = post.preview?.url.match(strRegEx)[1];
    const preview = `${file}?width=640&crop=smart&auto=webp&s=${str}`;

    const reInitCard = () => {
        if (!node) return null;
        const card = {
            id: index,
            width: node.getBoundingClientRect().width,
            height: node.getBoundingClientRect().height
        }
        !selected && dispatch(initCard(card))
    }

    const [node, setRef] = useState(null);
    useEffect(() => {
        console.log(post.preview)
        if (!node) return null;
        const card = {
            id: index,
            width: node.getBoundingClientRect().width,
            height: node.getBoundingClientRect().height
        }
        !selected && dispatch(initCard(card));
        const resizeListener = debounce(()=>{
            if (!node) return null;
            const card = {
                id: index,
                width: node.getBoundingClientRect().width,
                height: node.getBoundingClientRect().height
            }
            !selected && dispatch(initCard(card))
        }, 500);
        // set resize listener
        window.addEventListener('resize', resizeListener);
        // clean up function
        return () => {
          // remove resize listener
          window.removeEventListener('resize', resizeListener);
        }

    },[node]);

    

    if(!post) return <h3 className="primary">Dieser Post existiert leider nicht :-(</h3>
    return (
    <li 
        className={cardClasses} 
        onClick={() => { !selected && dispatch(setSelectedId(post.id))}} 
        ref={setRef} 
        style={{ 'transform': `translateY(-${ offsets[index]?.translateY || 0 }px)` }} >
        {selected &&     (<motion.button 
                            onClick={() => {dispatch(setSelectedId(null))}} 
                            className="btn-close"
                            variants={buttonTransition}
                        >close
                            <svg version="1.1" width="10" height="10" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20">
                                <line id="close-btn-stroke1" x1="2.78" y1="17.22" x2="17.22" y2="2.78"/>
                                <line id="close-btn-stroke2" x1="2.78" y1="2.78" x2="17.22" y2="17.22"/>
                            </svg>
                        </motion.button>)}
        <div 
            className="card-details" 
            title={'show details: ' + shortenTitle(postTitle, 20)} >
            
            <div>
                { post.video_url && (
                    <video 
                        poster={post.thumbnail} 
                        controls 
                        width={post.video_width} 
                        height={post.video_height}
                        onLoadedData={reInitCard}>
                        <source src={post.video_url}/>
                        Sorry, your browser doesn't support this video format.
                    </video>
                )}
                { !post.video_url && isImg && (
                    <img 
                        src={ post.preview ? preview : post.url } 
                        width={post.img_width} 
                        height={post.img_height} 
                        alt=""
                        onLoad={reInitCard}/>
                )}
                
                <div className='card-body'>
                    { !post.video_url && !isImg && post?.url && (
                        <a href={post.url} title={post.url}>{ url+'...' }</a>
                    )}
                    <p className="post-author author">Posted by <span className="name">{post.author}</span> {formatDate(post.created_utc)} ago</p>
                    <h2 className="title">{ selected ? postTitle : shortenTitle(postTitle, 50)}</h2>
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