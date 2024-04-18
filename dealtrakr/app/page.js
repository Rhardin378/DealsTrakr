"use client";
import { useState } from "react";
import { companiesAPI } from "./data/companiesAPI";
import AddCompanyButton from "./components/AddCompanyButton";

export default function Home() {
  const [allCompanies, _] = useState(companiesAPI.getAll());

  return <main></main>;
}
