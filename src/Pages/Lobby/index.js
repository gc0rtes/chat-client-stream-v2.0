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
  const [newChannel, setNewChannel] = useState(null);
  // const [foundChannel, setFoundChannel] = useState(null)

  useEffect(() => {
    queryChannels(chatClient, setChannels, userId);
  }, []);

  useEffect(() => {}, [newChannel]);

  // //find the channel acording newChannel selected
  // const findChannel = (channels) => {
  //    channels.find(
  //     (element) =>
  //       element.type === newChannel.channelType &&
  //       element.id === newChannel.channelId
  //   );
  // }

  //initialize a channel dynamically
  const channel = chatClient.channel("livestream", "general");

  //every time thath a newChannel is clicked
  useEffect(() => {}, [newChannel]);

  console.log("what is channels", channels);
  console.log("what is channel", channel);
  console.log("what is newChannel", newChannel);
  // console.log("what is foundChannel", foundChannel);

  return (
    <div className="container border my-3">
      <h3>Hello {userId}</h3>
      <a href="/">Logout</a> {/* It makes refresh the page */}
      <div className="row border" style={{ height: "85vh" }}>
        {channels && (
          <ChatList channels={channels} setNewChannel={setNewChannel} />
        )}
        <ChatBox />
      </div>
    </div>
  );
}
