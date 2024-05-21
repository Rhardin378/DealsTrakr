"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import { companiesAPI } from "../data/companiesAPI";
import AddCompanyButton from "../components/AddCompanyButton";
import CompaniesListView from "../components/CompaniesListView";
import Link from "next/link";
import DealsListView from "../components/DealsListView";
import DashboardView from "../components/DashboardView";

export default function Dashboard() {
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
          <DashboardView />
        </Tab>
      </Tabs>
    </main>
  );
}
