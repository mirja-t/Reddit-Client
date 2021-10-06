import {
    useRef, 
    useState,
    cloneElement
} from 'react';
import { 
    useGrid
} from '../masonryGrid/useGrid';

export const MasonryGrid = ({ items, children, id, fn, additional }) => {
    
    const [gridContainer, setGridContainer] = useState(null);
    const itemsRef = useRef([]);
    const {grid, containerHeight} = useGrid(gridContainer, itemsRef.current);

    return (<ul 
        id={id} 
        ref={setGridContainer}
        style={{height: containerHeight}}
        >
        {items.map((item, index) => (
            <li key={item.id} 
                className="card" 
                onClick={() => { fn(item) }}
                ref={ element => itemsRef.current[index] = element }
                style={{ 'transform': `translateY(-${ grid[index] || 0 }px)` }} 
                >
                    { cloneElement(children, {
                        item,
                        additional
                    })}
            </li>))}
    </ul>)
}