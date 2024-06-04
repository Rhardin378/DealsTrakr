import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDeals } from "../store/slices/deals";
import { deleteDeal } from "../store/slices/deleteDealSlice";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useRouter } from "next/navigation";
import {setTab} from "../store/slices/deals";

const DeleteDealButton = ({ dealId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      dispatch(deleteDeal(dealId));
      dispatch(fetchDeals());
      handleCloseModal();
      dispatch(setTab("deals"));
      router.push('/dashboard');
    } catch (error) {
      console.error("Error deleting deal:", error);
    }
  };



  return (
    <>
      <Button className="delete-button" onClick={handleShowModal}>
          Delete Deal
      </Button>
      <ConfirmDeleteModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleDelete}
      />
    </>
  );
};

export default DeleteDealButton;
