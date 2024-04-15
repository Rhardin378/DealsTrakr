'use client'
import React from "react";
import AddCompany from "../components/AddCompanyForm";
import AddCompanyButton from "../components/AddCompanyButton";

const AddCompanyForm = () => {
  return (
    <div>
      <h1>Add a New Company</h1>
      <AddCompany />
    </div>
  );
};

export default AddCompanyForm;