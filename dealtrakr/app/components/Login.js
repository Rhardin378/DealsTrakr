"use client";
import React, { useState } from "react";
import { signup, signin } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    const user = { email, password };
    dispatch(signin(user));
    router.push("/dashboard");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                onClick={handleSignIn}
                className="btn btn-primary btn-block"
              >
                Sign In
              </button>
              {error && <div className="text-danger mt-3">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
