"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { fetchUser, signout } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  // if signed it show log out if logged out show sign in

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const authenticated = useSelector((state) => state.auth.authenticated);
  const email = useSelector((state) => state.auth.email);

  const renderLinks = () => {
    if (authenticated) {
      return (
        <div className="d-flex justify-content-between ">
          <div className="nav-email">{email}</div>
          <button
            className="navbar-nav nav-item"
            onClick={() => dispatch(signout())}
          >
            sign out
          </button>
        </div>
      );
    } else {
      return (
        <Link className="navbar-nav nav-item" href="/">
          <span>Sign in</span>
        </Link>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="d-flex justify-content-between container-fluid ">
        <Link href="/dashboard" className="navbar-brand">
          <span className="">DealsTrakr</span>
        </Link>
        {renderLinks()}
      </div>
    </nav>
  );
};

export default Navbar;
