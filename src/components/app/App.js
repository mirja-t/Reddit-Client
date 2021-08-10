import './App.scss';
import { PostList } from '../postlist/PostList';
import { Sidebar } from '../stateless/sidebar/Sidebar';

function App() {
  return (
    <div id="wrapper">
      <Sidebar/>
      <PostList/>
    </div>
  );
}

export default App;
