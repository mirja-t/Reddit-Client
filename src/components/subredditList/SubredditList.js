
import {Subreddit} from './subreddit/Subreddit.js';
import './subredditList.scss';

export const SubredditList = () => {

    // temporarily hardcoded subreddit list for styling puposes
    const subreddits = [
      {name: 'Design', path: 'r/design', active: true}, 
      {name: 'Food', path: 'r/food', active: false}, 
      {name: 'Monsters', path: 'r/monsters', active: false}, 
      {name: 'Zombies', path: 'r/zombies', active: false}];

    return (
      <aside>
        <h2>Subreddit list</h2>
        <ul className="subredditlist">
          {subreddits.map((subreddit) => (
            <Subreddit 
              key={subreddit.path} 
              name={subreddit.name} 
              path={subreddit.path}
              active={subreddit.active}
            />
          ))}
        </ul>
      </aside>
    );
}