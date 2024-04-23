"use client";
import { useState } from "react";
import { companiesAPI } from "../data/companiesAPI";
import AddCompanyButton from "../components/AddCompanyButton";
import CompaniesListView from "../components/CompaniesListView";
import Link from "next/link";

export default function Dashboard() {
  const [allCompanies, _] = useState(companiesAPI.getAll());

  return (
    <main>
      {/* links components */}
      <div>
        <Link href="/companies">Companies</Link>
        <Link href="/deals">Deals</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/addcompany">Add New Company</Link>
      </div>
      <h1>Companies</h1>
      <CompaniesListView />
    </main>
  );
}
