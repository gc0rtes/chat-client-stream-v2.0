import { BrowserRouter as Router, Route } from "react-router-dom";

import Lobby from "./Pages/Lobby";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/lobby" component={Lobby} />
    </Router>
  );
}

export default App;
