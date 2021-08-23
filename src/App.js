import { useState } from "react";

import Lobby from "./Pages/Lobby";
import Login from "./Pages/Login";

function App() {
  const [chatClient, setChatClient] = useState(null);
  console.log("what is chatClient?", chatClient);
  return chatClient ? (
    <Lobby chatClient={chatClient} />
  ) : (
    <Login setChatClient={setChatClient} />
  );
}

export default App;
