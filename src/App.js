import { useState } from "react";

import Lobby from "./Pages/Lobby";
import Login from "./Pages/Login";

function App() {
  const [connectUser, setConnectUser] = useState(null);
  console.log("what is connectUser?", connectUser);
  return connectUser ? (
    <Lobby connectUser={connectUser} />
  ) : (
    <Login setConnectUser={setConnectUser} />
  );
}

export default App;
