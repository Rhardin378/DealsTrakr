'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    if (username === "HBO_Admin" && password === "hbomax") {
      // If username and password match, navigate to dashboard
      router.push("/dashboard");
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
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
