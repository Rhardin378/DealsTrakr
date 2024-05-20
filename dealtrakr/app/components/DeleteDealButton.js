import React from "react";
import { useDispatch } from "react-redux";
import { fetchDeals } from "../store/slices/deals";
import { deleteDeal } from "../store/slices/deleteDealSlice";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useState } from "react";

const DeleteDealButton = ({ dealId }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      dispatch(deleteDeal(dealId));
      dispatch(fetchDeals());
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting track:", error);
    }
  };

  return (
    <>
      <Button className="delete-button" onClick={handleShowModal}>
        Delete Deal
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

export default DeleteDealButton;