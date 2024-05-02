"use client";
import { useState } from "react";
import CompaniesListView from "./components/CompaniesListView";
import Link from "next/link";
import Login from "./components/Login";
export default function Home() {

  return (
    <main>
      {/* links components */}
      <div>
        <Link href="#">Companies</Link>
        <Link href="#">Deals</Link>
        <Link href="#">Dashboard</Link>
      </div>
      <br />
      <Login />
    </main>
  );
}
