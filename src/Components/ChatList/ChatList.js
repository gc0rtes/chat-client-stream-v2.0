import { useState, useEffect } from "react";

export default function ChatList({ channels, setChannel }) {
  const [makeItRender, setmakeItRender] = useState("");

  // console.log("channels", channels);
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
            <div style={{ fontSize: "14px" }}> {channel.id}</div>
            <div style={{ fontSize: "10px" }}>{channel.state.unreadCount}</div>
            <div style={{ fontSize: "10px" }}>
              (
              {channel.state.messages[
                channel.state.messages.length - 1
              ].text.substring(0, 10)}
              )
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
