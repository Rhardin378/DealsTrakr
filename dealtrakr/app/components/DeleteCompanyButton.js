import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchCompanies } from "../store/slices/companies";
import { deleteCompany } from "../store/slices/deleteCompanySlice";
import Button from "react-bootstrap/Button";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const DeleteCompanyButton = ({ companyId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      dispatch(deleteCompany(companyId));
      dispatch(fetchCompanies());
      handleCloseModal();
      router.push('/dashboard');
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <>
      <Button className="delete-button" onClick={handleShowModal}>
        Delete Company
      </Button>
      <ConfirmDeleteModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleDelete}
      />
    </>
  );
};

export default DeleteCompanyButton;
