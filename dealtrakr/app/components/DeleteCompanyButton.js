import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCompanies } from "../store/slices/companies";
import { deleteCompany } from "../store/slices/deleteCompanySlice";
import Button from "react-bootstrap/Button";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Link from "next/link";

const DeleteCompanyButton = ({ companyId }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      dispatch(deleteCompany(companyId));
      dispatch(fetchCompanies()); 
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <>
      <Button className="delete-button" onClick={handleShowModal}>
        Delete Company
      </Button>
      <Link href='/dashboard'>
        <ConfirmDeleteModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleDelete}
        />
      </Link>
    </>
  );
};

export default DeleteCompanyButton;
