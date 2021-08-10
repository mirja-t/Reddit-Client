
import './postList.scss';
import {
    useRef, 
    useEffect, 
    useState
} from 'react';
import { 
    useSelector, 
    useDispatch 
} from 'react-redux';
import { 
    selectSubreddit 
} from '../app/AppSlice';
import { 
    selectPosts,
    loadPosts,
    getSelectedId
} from './postListSlice';
import { 
    selectGrid, 
    resetGrid, 
    setOffsets 
} from './postListSlice';
import { Post } from './post/Post.js';
import { Loader } from '../stateless/loader/Loader';
import { 
    AnimatePresence, 
    motion 
} from "framer-motion";
import { 
    cardTransition, 
    bgTransition
} from '../app/transitions';
import {translateCards} from '../../utils/grid/grid';

export const PostList = () => {

    const dispatch = useDispatch();
    const subreddit = useSelector(selectSubreddit);
    const selectedId = useSelector(getSelectedId);
    const postList = useSelector(selectPosts);

    const posts = postList.posts;
    const selectedPost = posts.find(post => post.id === selectedId);
    const gridContainer = useRef(null);
    const [containerHeight, setContainerHeight] = useState();

    const grid = useSelector(selectGrid);

    useEffect(() => {
        dispatch(loadPosts(subreddit));
        dispatch(resetGrid)
    }, [subreddit]);

    useEffect(() => {
        if(grid.length <= 0 || postList.isLoading || postList.hasError) return
        const offsets = translateCards(gridContainer.current, grid)
        dispatch(setOffsets(offsets));
    }, [grid]);

    if(postList.isLoading) return (<Loader/>)
    if(postList.hasError) return (<div className="error"><div><h3 className="primary">Da hat wohl jemand Rotz gecoded :-(</h3></div></div>)

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
                        transition={'transition'}
                        >
                        <Post 
                            post={selectedPost} 
                            subredditPath={subreddit}
                            selected={true}/>
                    </motion.ul>
                )}
            </AnimatePresence>
            
            <div id="postlist-wrapper" style={containerHeight}>
                    <ul id="postlist" ref={gridContainer}>
                        {posts.map((post, index) => (
                            
                            <Post 
                                post={post} 
                                key={post.id} 
                                index={index}
                                selected={false} />
                            )
                        )}
                    </ul>
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