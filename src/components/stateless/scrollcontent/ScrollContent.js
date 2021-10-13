import './scrollcontent.scss';
import { useState, useEffect } from 'react';


export const ScrollContent = ({ children, parentEl }) => {    
    
    const [wrapperRef, setWrapperRef] = useState(null);
    const [scrollContainerRef, setScrollContainerRef] = useState(null);
    const [elRef, setElRef] = useState(null);
    const [classes, setClasses] = useState('scrollcontent');
    const [height, setHeight] = useState(null);
    const [scrollbarHeight, setScrollbarHeight] = useState(0);
    const [scrollOffset, setScrollOffset] = useState(0);

    // init parent height
    useEffect(()=>{

        if(!parentEl) return;
        setHeight(parentEl.offsetHeight);
    },[parentEl, parentEl?.offsetHeight]);

    // init scrollbar
    useEffect(()=>{
        if(!elRef || !height) return;
        const overflow = elRef.offsetHeight > height + 2;
        setClasses(overflow ? 'scrollcontent scroll' : 'scrollcontent');
        setScrollbarHeight(height / elRef?.offsetHeight * height);
    },[children, elRef, height]);

    // resize
    useEffect(()=>{
        if(!elRef || !height) return;
        const overflow = elRef.offsetHeight > height + 2;
        const handleResize = () => {
            setClasses(overflow ? 'scrollcontent scroll' : 'scrollcontent');
            setScrollbarHeight(height / elRef?.offsetHeight * height);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[children, height, elRef]);

    // scroll
    useEffect(()=>{
        if(!scrollContainerRef) return;
        
        const handleScroll = () => {
            const offset = wrapperRef?.getBoundingClientRect().top - elRef?.getBoundingClientRect().top;
            const scrollbarDist = scrollbarHeight / height;
            setScrollOffset(offset * scrollbarDist);
        }
        scrollContainerRef.addEventListener('scroll', handleScroll);
        return () => {
            scrollContainerRef.removeEventListener('scroll', handleScroll);
        }
    });

    return (
        <div className="scrollcontent-wrapper" ref={setWrapperRef} style={{height: height ? `${height}px` : 'auto' }}>
            {elRef?.offsetHeight > height + 2 && 
                <div className="scrollbar" style={{
                    height: `${scrollbarHeight}px`,
                    transform: `translateY(${scrollOffset}px)`
                }}/>
            }
            <div ref={setScrollContainerRef} className={classes} style={{height: height ? `${height}px` : 'auto' }}>
                <div ref={setElRef}>
                    { children }
                </div>
            </div>
        </div>)
}