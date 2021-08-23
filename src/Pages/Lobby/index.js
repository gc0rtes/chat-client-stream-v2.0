import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";

// Components
import ChatList from "../../Components/ChatList";
import ChatBox from "../../Components/ChatBox";

// Functions
import { queryChannels } from "../../Components/queryChannels";

const API_KEY = process.env.REACT_APP_API_KEY;

// Instantiate the client with getInstance().
// It doesn’t make an API call.
// It is a constructor function to create a JS object with lots of functions.
const chatClient = StreamChat.getInstance(API_KEY);

export default function Lobby({ connectUser }) {
  const userId = connectUser.me.id;
  const [channels, setChannels] = useState(null);
  const [channelId, setChannelId] = useState("general");
  const [channelType, setChannelType] = useState("livestream");

  useEffect(() => {
    // The default queryChannels API returns channels and starts watching them.
    // There is no need to also use channel.watch on the channels returned from queryChannels
    queryChannels(chatClient, setChannels, userId);
  }, []);

  // Initialize a channel dynamically
  const channel = chatClient.channel(channelType, channelId);

  console.log("what is channels", channels);
  // console.log("what is channel", channel);
  // console.log("what is channelId", channelId);
  // console.log("what is channelType", channelType);

  return (
    <div className="container border my-3">
      <h3>Hello {userId}</h3>
      <a href="/">Logout</a> {/* It makes refresh the page */}
      <div className="row border" style={{ height: "85vh" }}>
        {channels && (
          <ChatList
            channels={channels}
            setChannelId={setChannelId}
            setChannelType={setChannelType}
          />
        )}
        <ChatBox channel={channel} userId={userId} />
      </div>
    </div>
  );
}
