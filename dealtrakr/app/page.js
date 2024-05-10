"use client";
import { useState } from "react";
import CompaniesListView from "./components/CompaniesListView";
import Link from "next/link";
import Login from "./components/Login";
export default function Home() {

  return (
    <main className="login-bg">
      <div>
      <Login />
      </div>
    </main>
  );
}
