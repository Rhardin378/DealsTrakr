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
      <Tabs defaultActiveKey="companies" id="tab-example" className=" ms-3">
        <Tab eventKey="companies" title="Companies" className="tabsClass">
          <CompaniesListView />
        </Tab>

        <Tab eventKey="deals" title="Deals" className="tabsClass">
        <DealsListView />

        </Tab>
        <Tab eventKey="dashboard" title="Dashboard" className="tabsClass">
          Tab content for Dashboard
        </Tab>
      </Tabs>
    </main>
  );
}
