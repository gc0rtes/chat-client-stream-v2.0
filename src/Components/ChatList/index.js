export default function ChatList({ channels, setNewChannel }) {
  console.log("what is channels?");
  return (
    <div className="col-3 p-2 border" style={{ height: "100%" }}>
      <h3>Channel list</h3>
      <div className="text-center">
        {!channels ? (
          <div className="spinner-border text-primary"></div>
        ) : (
          channels.map((channel, index) => (
            <button
              type="button"
              className="btn btn-primary btn-block p-1 m-1"
              key={index}
              onClick={() =>
                setNewChannel({
                  channelId: channel.id,
                  channelType: channel.type,
                })
              }
            >
              {channel.id}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
