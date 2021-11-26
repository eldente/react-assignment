import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import PostPage from "./routes/PostPage";
import PostList from "./routes/PostList";

function App() {
  const propsMessage = "Hello from ";

  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/posts" exact />
        <Route exact path="/posts">
          <PostList propsMessage={propsMessage} />
        </Route>
        <Route exact path="/posts/:id">
          <PostPage propsMessage={propsMessage} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
