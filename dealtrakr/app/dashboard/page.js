"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import { companiesAPI } from "../data/companiesAPI";
import AddCompanyButton from "../components/AddCompanyButton";
import CompaniesListView from "../components/CompaniesListView";
import Link from "next/link";
import DealsListView from "../components/DealsListView";

export default function Dashboard() {
  const [allCompanies, _] = useState(companiesAPI.getAll());

  return (
    <main>
      {/* links components */}
      <div>
        {/* <Link href="/companies">Companies</Link>
        <Link href="/deals">Deals</Link>
        <Link href="/dashboard">Dashboard</Link> */}
        {/* <Link href="/addcompany">Add New Company</Link> */}
      </div>

      <Tabs
        defaultActiveKey="companies"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="companies" title="Companies">
          <CompaniesListView />{" "}
        </Tab>
        <Tab eventKey="deals" title="Deals">
          <DealsListView />{" "}
        </Tab>
        <Tab eventKey="dashboard" title="Dashboard">
          Tab content for Dashboard
        </Tab>
      </Tabs>
    </main>
  );
}
