import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    if (username === "HBO_Admin" && password === "hbomax") {
      // If username and password match, set loggedIn to true
      setLoggedIn(true);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
      {loggedIn && (
        <Link href="/dashboard">
          <button>Go to Dashboard</button>
        </Link>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
