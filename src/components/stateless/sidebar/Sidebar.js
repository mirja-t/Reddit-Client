import { useState } from 'react';
import { ScrollContent } from '../scrollcontent/ScrollContent';
import { SubredditList } from '../../subredditList/SubredditList';
import { Search } from '../../search/Search';
import './sidebar.scss';

export const Sidebar = () => {
    const [parentEl, setParentEl] = useState(null);
    return (
      
      <aside>
        <header>
          <div id="logo"></div>
          <h2>Subreddit</h2>
          <h5>minimal</h5>
          <Search/>
        </header>
        <div className="scrollcontainer" ref={setParentEl}>
          <ScrollContent 
            parentEl={parentEl}>
            <SubredditList/>
          </ScrollContent>
        </div>
      </aside>
    );
}