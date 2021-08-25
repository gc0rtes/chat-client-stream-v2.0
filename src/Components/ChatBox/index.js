import { useState, useEffect } from "react";
import moment from "moment";
export default function ChatBox({ channel, userId }) {
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState(channel.state.messages);

  // Set messages at first render and every time channel changes
  useEffect(() => {
    setMessages(channel.state.messages);
    console.log("setmessage/channel called");
  }, [channel]);

  // Start to listen Events (new.message) on channel
  useEffect(() => {
    channel.on("message.new", (event) => {
      // console.log("what is event.message?", event.message);
      setMessages([...messages, event.message]);
      // console.log("channel.state", channel.state);
    });
  }, []);

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
    e.preventDefault(); // prevent browser to refresh when click on button
    toSendMessage(sendMessage);
    setSendMessage("");
  };

  return (
    <div className="col-9 border">
      <div className="border  p-2" style={{ height: "93%" }}>
        <h3>Channel #{channel.id}</h3>
        {/* Load messages box*/}
        {messages.map((message, index) => (
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
      {/* Send message input */}
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
