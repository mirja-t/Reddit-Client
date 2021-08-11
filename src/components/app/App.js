import './App.scss';
import { PostList } from '../postlist/PostList';
import { Sidebar } from '../stateless/sidebar/Sidebar';

export const App = () => {
  return (
    <div id="wrapper">
      <Sidebar/>
      <PostList/>
    </div>
  );
}