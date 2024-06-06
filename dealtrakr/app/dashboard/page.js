"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import CompaniesListView from "../components/CompaniesListView";
import DealsListView from "../components/DealsListView";
import DashboardView from "../components/DashboardView";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const currentTab = useSelector((state) => state.deals.currentTab);

  const [activeKey, setActiveKey] = useState(currentTab || "companies");

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  return (
    <main>
      <Tabs
        activeKey={activeKey}
        onSelect={handleSelect}
        id="tab-example"
        className="ms-3"
      >
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
