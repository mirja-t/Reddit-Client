import SimpleBar from 'simplebar-react';
import '../../../../node_modules/simplebar/dist/simplebar.min.css';
import { SubredditList } from '../../subredditList/SubredditList';
import './sidebar.scss';

export const Sidebar = () => {
    
    return (
      
      <aside>
        <header>
          <div id="logo"></div>
          <h2>Subreddit</h2>
          <h5>minimal</h5>
        </header>
        <div className="scrollcontainer">
          <SimpleBar style={{ maxHeight: '95%' }}>
            <SubredditList/>
          </SimpleBar>
        </div>
      </aside>
    );
}