import React from "react";
import { useDispatch } from "react-redux";
import { fetchCompanies } from "../store/slices/companies";
import { deleteCompany } from "../store/slices/deleteCompanySlice";
import Link from "next/link";
import Button from "react-bootstrap/Button";

const DeleteCompanyButton = ({ companyId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      dispatch(deleteCompany(companyId));
      dispatch(fetchCompanies());
    } catch (error) {
      console.error("Error deleting track:", error);
    }
  };

  return (
    <Link href='/dashboard'>
    <Button className="delete-button" onClick={handleDelete}>
      Delete Company
    </Button></Link>

  );
};

export default DeleteCompanyButton;