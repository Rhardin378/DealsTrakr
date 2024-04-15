'use client'
import { useState } from "react";
import { companiesAPI } from "./data/companiesAPI";


export default function Home() {
  const [allCompanies, _] = useState(companiesAPI.getAll());

  return (
    <main>
			<div>
			</div>
		</main>
  );
}
