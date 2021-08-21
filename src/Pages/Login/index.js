import "./index.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState(null);
  return (
    <div className="vertical-horizontal-center">
      <form onSubmit={null}>
        <input
          type="text"
          placeholder="Enter user ID"
          onChange={(e) => setUserId(e.target.value)}
        />
        <Link
          onClick={(e) => (!userId ? e.preventDefault() : null)}
          to={`/lobby`}
        >
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </form>
    </div>
  );
}
