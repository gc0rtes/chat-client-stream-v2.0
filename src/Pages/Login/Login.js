import "./index.css";
import { useState } from "react";

// Functions
import { getTokenAndConnectUser } from "../../Components/getTokenAndConnectUser";

export default function Login({ setConnectUser }) {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    getTokenAndConnectUser(userId, setConnectUser, setError);
  };

  return (
    <div>
      <div className="vertical-horizontal-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter user ID"
            className="form-control"
            onChange={(e) => setUserId(e.target.value)}
          />
          {/* <button className="btn btn-primary" type="submit">
            Sign In
          </button> */}
        </form>
      </div>
      <div>
        {error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}
