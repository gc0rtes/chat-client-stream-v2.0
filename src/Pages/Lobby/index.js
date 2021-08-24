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
  const [channelMessages, setChannelMessages] = useState(null);
  const [channelId, setChannelId] = useState("general");
  const [channelType, setChannelType] = useState("livestream");

  // Initialize a channel dynamically
  const channel = chatClient.channel(channelType, channelId);

  useEffect(() => {
    // The default queryChannels API returns channels and starts watching them.
    // There is no need to also use channel.watch on the channels returned from queryChannels
    queryChannels(chatClient, setChannels, userId);
  }, []);

  useEffect(() => {
    const setMessagesAndWatchChannel = async () => {
      // Calling channel.watch() allows you to listen for events when anything in the channel changes
      try {
        const watch = await channel.watch();
        setChannelMessages(channel.state.messages);
        console.log("what is watch", watch);
      } catch (error) {
        console.log("watch channel failed >", error);
      }
    };

    setMessagesAndWatchChannel();
  }, [channels, channelId]);

  channel.on("message.new", () => {
    setChannelMessages(channel.state.messages);
  });

  // useEffect(() => {
  //   // I want to make sure the channel.on is listening whenever the user changes the channel that is why channel.on is inside this useEffect
  //   // So, everytime new message arrives set the channelMessages > it will send a new props to child ChatBox and generate a new render with the new message
  //   channel.on("message.new", (event) => {
  //     setChannelMessages(channel.state.messages);
  //   });
  //   setChannelMessages(channel.state.messages);
  // }, [channels, channelId]); // Monitoring the "channels" to render at first render, and "channelId" to render and listen on.channel every time channel changes

  console.log("what is channel", channel);
  console.log("what is channels", channels);
  console.log("what is channel.state.messages", channel.state.messages);
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
        {channel && channels && (
          <ChatBox
            channel={channel}
            userId={userId}
            channelMessages={channelMessages}
          />
        )}
      </div>
    </div>
  );
}
