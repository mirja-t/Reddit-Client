import React, {useRef, useEffect, useState} from 'react';
import {Post} from './post/Post.js';
import './postList.scss';
import { getSubredditData } from '../../utils/reddit';
import { AnimatePresence, motion } from "framer-motion";
import {cardTransition, buttonTransition, bgTransition} from '../app/transitions';
import {translateCards, setHeight} from '../../utils/grid/grid';
import {debounce} from '../../utils/debounce';

export const PostList = ({subredditPath}) => {

    const [posts, setPosts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const selectedPost = posts.find(post => post.id === selectedId);
    const gridContainer = useRef(null);
    const [offsets, setOffsets] = useState({});
    const [containerHeight, setContainerHeight] = useState();
    const [gridLoaded, setGridLoaded] = useState(0);
    const [resizeEvent, setResizeEvent] = useState(0);

    const grid = {};
    const setGrid = (obj, index) => {
        grid[index] = obj;
    }

    const loadData = (subredditPath) => {
        getSubredditData(subredditPath).then(response => {
            setPosts(response);
        });
    }

    const selectPost = (id) => {
        setSelectedId(id);
    }

    const initGrid = () => {
        console.log('initGrid:', grid[0]?.id);
        if(grid[0] !== undefined) {
            console.log('init grid', grid[3].width)
            setOffsets(translateCards(gridContainer.current, grid));
            setGridLoaded(gridLoaded + 1);
        }
    }
    const resizeGrid = debounce(initGrid, 500);

    const resizeListener = () => {
        console.log('resizeListener')
        resizeGrid();
    }

    useEffect(()=> {
        initGrid();
    },[posts])

    useEffect(()=>{
        
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    },[])

    useEffect(() => {
        loadData(subredditPath);
    }, [subredditPath]);


    return (
    <>
        <main>{
            <AnimatePresence>
                {selectedId && (
                    
                    <motion.div 
                        class='card-container'
                        key={selectedId} 
                        layoutId={selectedId}
                        variants={cardTransition}
                        initial={'initial'}
                        animate={'animate'}
                        exit={'exit'}
                        transition={'transition'}
                        >
                        <motion.button 
                            onClick={() => setSelectedId(null)} 
                            className="btn-close"
                            variants={buttonTransition}
                        >close
                            <svg version="1.1" width="10" height="10" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20">
                                <line id="close-btn-stroke1" x1="2.78" y1="17.22" x2="17.22" y2="2.78"/>
                                <line id="close-btn-stroke2" x1="2.78" y1="2.78" x2="17.22" y2="17.22"/>
                            </svg>
                        </motion.button>
                        <Post 
                            post={selectedPost} 
                            subredditPath={subredditPath}
                            selected={true}/>
                    </motion.div>
                )}
            </AnimatePresence>}

            <div id="postlist-wrapper" style={containerHeight}>
                <ul id="postlist" ref={gridContainer}>
                    {posts.map((post, index) => (

                        <Post 
                            post={post} 
                            key={post.id} 
                            index={index}
                            selectPost={selectPost}
                            selected={false}
                            setGrid={setGrid}
                            offset={offsets[index]}
                        />)
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