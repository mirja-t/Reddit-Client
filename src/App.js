import './App.scss';
import {Styles} from './components/styles/Styles';
import {SubredditList} from './components/subredditList/SubredditList.js';

function App() {
  return (
    <>
      <SubredditList/>
      <Styles/>
    </>
  );
}

export default App;
