import React from "react";
import { useDispatch } from "react-redux";
import { fetchDeals } from "../store/slices/deals";
import { deleteDeal } from "../store/slices/deleteDealSlice";
import Link from "next/link";
import Button from "react-bootstrap/Button";

const DeleteDealButton = ({ dealId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      dispatch(deleteDeal(dealId));
      dispatch(fetchDeals());
    } catch (error) {
      console.error("Error deleting track:", error);
    }
  };

  return (
    <Link href='/dashboard'>
    <Button className="delete-button" variant="secondary" onClick={handleDelete}>
      Delete Deal
    </Button></Link>

  );
};

export default DeleteDealButton;