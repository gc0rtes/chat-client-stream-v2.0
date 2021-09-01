import { useState, useEffect } from "react";

// Components
import ChatList from "../../Components/ChatList";
import ChatBox from "../../Components/ChatBox";

// Functions
import { queryChannels } from "../../Components/queryChannels";

export default function Lobby({ connectUser }) {
  const userId = connectUser.me.id;
  const [channels, setChannels] = useState(null);
  const [channel, setChannel] = useState(null);
  // const [makeItRender, setmakeItRender] = useState("");

  useEffect(() => {
    // The default queryChannels API returns channels and starts watching them.
    // There is no need to also use channel.watch on the channels returned from queryChannels
    queryChannels(setChannel, setChannels, userId);
  }, []);

  // console.log("what is channels", channels);
  // console.log("what is channel", channel);

  return (
    <div className="container border my-3">
      <h3>Hello {userId}</h3>
      <a href="/">Logout</a> {/* It makes refresh the page */}
      <div className="row border" style={{ height: "85vh" }}>
        {channels && <ChatList channels={channels} setChannel={setChannel} />}
        {channel?.data.id && <ChatBox channel={channel} userId={userId} />}
      </div>
    </div>
  );
}
