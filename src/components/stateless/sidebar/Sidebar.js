import SimpleBar from 'simplebar-react';
import { SubredditList } from '../../subredditList/SubredditList';
import { Search } from '../../search/Search';
import './sidebar.scss';

export const Sidebar = () => {
    
    return (
      
      <aside>
        <header>
          <div id="logo"></div>
          <h2>Subreddit</h2>
          <h5>minimal</h5>
        </header>
        <Search/>
        <div className="scrollcontainer">
          <SimpleBar style={{ maxHeight: '95%' }}>
            <SubredditList/>
          </SimpleBar>
        </div>
      </aside>
    );
}