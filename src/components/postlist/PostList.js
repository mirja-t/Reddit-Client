
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
    setOffsets,
    getOffsets 
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
import {
    translateCards,
    setHeight
} from '../../utils/grid/grid';

export const PostList = () => {

    const dispatch = useDispatch();
    const subreddit = useSelector(selectSubreddit);
    const selectedId = useSelector(getSelectedId);
    const postList = useSelector(selectPosts);
    const offsetList = useSelector(getOffsets);

    const posts = postList.posts;
    const selectedPost = posts.find(post => post.id === selectedId);
    const gridContainer = useRef(null);
    const [containerHeight, setContainerHeight] = useState(null);

    const grid = useSelector(selectGrid);

    useEffect(() => {
        dispatch(loadPosts(subreddit));
        dispatch(resetGrid)
    }, [subreddit, dispatch]);

    useEffect(() => {
        if(grid.length <= 0 || postList.isLoading || postList.hasError) return
        const offsets = translateCards(gridContainer.current, grid)
        dispatch(setOffsets(offsets));
    }, [grid, dispatch, postList.hasError, postList.isLoading]);

    useEffect(()=>{
        if(grid.length <= 0 || postList.isLoading || postList.hasError) return
        const containerHght = setHeight(gridContainer.current, grid);
        setContainerHeight(containerHght);
    },[offsetList, grid, postList.hasError, postList.isLoading]);

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
            
            <div id="postlist-wrapper">
                    <ul id="postlist" ref={gridContainer} style={{height: containerHeight}}>
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