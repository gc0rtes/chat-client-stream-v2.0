export default function Lobby({ chatClient }) {
  const userId = chatClient.me.id;

  return (
    <div>
      <h1>Hello {userId}</h1>
      <a href="/">Logout</a> {/* It makes refresh the page */}
    </div>
  );
}
