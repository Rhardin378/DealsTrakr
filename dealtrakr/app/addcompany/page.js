'use client'
import React from "react";
import AddCompany from "../components/AddCompanyForm";
import AddCompanyButton from "../components/AddCompanyButton";

const AddCompanyForm = () => {
  return (
    <div>
      <h2>Add a New Company</h2>
      <AddCompany />
    </div>
  );
};

export default AddCompanyForm;