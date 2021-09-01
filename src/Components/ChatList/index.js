import { useState, useEffect } from "react";

export default function ChatList({ channels, setChannel }) {
  const [makeItRender, setmakeItRender] = useState("");

  console.log("chatlist render");
  console.log("channels", channels);
  // console.log("makeItRender", makeItRender);

  useEffect(() => {
    channels.map((channel) => {
      channel.on((event) => {
        setmakeItRender(event);
      });
    });
  }, [channels]);

  return (
    <div className="col-3 p-2 border" style={{ height: "100%" }}>
      <h3>Channel list</h3>
      <div className="text-center">
        {channels.map((channel, index) => (
          <div
            className="border"
            key={index}
            onClick={() => setChannel(channel)}
          >
            <h6> {channel.id}</h6>
            <h6>{channel.state.unreadCount}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
