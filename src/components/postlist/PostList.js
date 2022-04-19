
import './postList.scss';
import { 
    useSelector, 
    useDispatch 
} from 'react-redux';
import { 
    selectSubreddit 
} from '../app/AppSlice';
import { 
    selectPosts,
    getSelectedId
} from './postListSlice';
import { 
    setSelectedId
} from './postListSlice';
import { 
    Post
} from './post/Post.js';
import { Loader } from '../stateless/loader/Loader';
import { Error } from '../stateless/error/Error';
import { 
    AnimatePresence, 
    motion 
} from "framer-motion";
import { 
    cardTransition, 
    bgTransition
} from '../app/transitions';
import {
    MasonryGrid
} from '@offensichtbar-codestock/react-flex-masonry-grid';

export const PostList = () => {

    const dispatch = useDispatch();
    const subreddit = useSelector(selectSubreddit);
    const selectedId = useSelector(getSelectedId);
    const postList = useSelector(selectPosts);

    const posts = postList.posts;
    const selectedPost = posts.find(post => post.id === selectedId);

    const handleClick = post => {
        !selectedId && dispatch(setSelectedId(post.id));
    }

    if(postList.isLoading) return <Loader/>
    if(postList.hasError) return <Error/>

    return (
    <>
        <main>
            <AnimatePresence>
                {selectedId && (
                    
                    <motion.ul 
                        className='card-container'
                        key={selectedId} 
                        layoutId={selectedId}
                        variants={cardTransition}
                        initial={'initial'}
                        animate={'animate'}
                        exit={'exit'}
                        transition={'transition'}>
                            <li className="card-selected">
                                <Post 
                                    item={selectedPost} 
                                    additional={{
                                        subredditPath: subreddit,
                                        selected: true
                                    }}/>
                            </li>
                    </motion.ul>
                )}
            </AnimatePresence>
            
            <div id="postlist-wrapper">
                <MasonryGrid 
                    id="postlist" 
                    items={posts}
                    config={{
                        gap: '5px',
                        flexbasis: '260px'
                    }}
                    additional={{
                        fn: handleClick,
                        selected: false, 
                        subredditPath: subreddit
                    }}>
                    <Post/>
                </MasonryGrid>
            </div>
        </main>

        <AnimatePresence>
            {selectedId && (
                <motion.div 
                    className="lightbox-bg"
                    variants={bgTransition}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}
                    transition={'transition'} />)}
        </AnimatePresence>
    </>)
}