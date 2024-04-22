"use client";
import { useState } from "react";
import { companiesAPI } from "./data/companiesAPI";
import AddCompanyButton from "./components/AddCompanyButton";
import CompaniesListView from "./components/CompaniesListView";
import Link from "next/link";
export default function Home() {
  const [allCompanies, setAllCompanies] = useState([]);

  return (
    <main>
      {/* links components */}
      <div>
        <Link href="#">Companies</Link>
        <Link href="#">Deals</Link>
        <Link href="#">Dashboard</Link>
      </div>
      <h1>Companies</h1>
      <CompaniesListView />
    </main>
  );
}
