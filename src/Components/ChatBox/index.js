export default function ChatBox() {
  return (
    <div className="col-9 border">
      <div className="border  p-2" style={{ height: "93%" }}>
        <h3>Hello from chatBox</h3>
      </div>
      <div className="border py-1 row">
        <div className="col-9">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="type your message"
              // value={newMessage}
              // onChange={(e) => setNewMessage(e.target.value)}
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
