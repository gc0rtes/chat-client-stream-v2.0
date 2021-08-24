import { useState } from "react";
import moment from "moment";
export default function ChatBox({ channel, userId, channelMessages }) {
  const [sendMessage, setSendMessage] = useState("");

  // Function for sending messages
  const toSendMessage = async (message) => {
    try {
      await channel.sendMessage({ text: message });
    } catch (error) {
      console.log("send message failed > ", error);
    }
  };

  // Function to handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    toSendMessage(sendMessage);
    setSendMessage("");
  };

  // console.log("what is channelMessages?", channelMessages);
  // console.log("channel.state.message", channel.state.messages);
  return (
    <div className="col-9 border">
      <div className="border  p-2" style={{ height: "93%" }}>
        <h3>Channel #{channel.id}</h3>
        {/* Load old messages */}
        {channelMessages.map((message, index) => (
          // message.user.id === userId ? setToggleAlign("text-left") :  setToggleAlign("text-right");
          <div
            key={index}
            className={message.user.id === userId ? "text-right" : "text-left"}
          >
            <div>
              {`${message.user.id} > ${message.text} (${moment(
                message.created_at
              ).format("ll")} at ${moment(message.created_at).format(
                "HH:mm"
              )})`}
            </div>
          </div>
        ))}
      </div>
      <div className="border py-1 row">
        <div className="col-9">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="type your message"
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
            />
          </form>
        </div>
        <div className="col-3">
          <button className="btn btn-primary">send</button>
        </div>
      </div>
    </div>
  );
}
