import { useState, useEffect } from "react";

export default function ChatList({ channels, setChannel }) {
  const [makeItRender, setmakeItRender] = useState("");

  console.log("channels", channels);
  // console.log("makeItRender", makeItRender);

  //check if channel members has property
  // if (Object.getOwnPropertyNames(channels[1].state.members).length === 0) {
  //   console.log("is empty");
  // } else {
  //   console.log("has props!");
  // }

  useEffect(() => {
    channels.map((channel) => {
      channel.on((event) => {
        setmakeItRender(event);
      });
    });
  }, [channels]);

  return (
    <div className="col-3 p-2 " style={{ height: "100%" }}>
      <div className="text-center border" style={{ height: "50%" }}>
        <h4>Channel list</h4>
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
      <div className="text-center border" style={{ height: "50%" }}>
        <h4>Members list</h4>
      </div>
    </div>
  );
}
