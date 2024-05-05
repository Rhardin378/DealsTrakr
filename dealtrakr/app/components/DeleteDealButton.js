import React from "react";
import { useDispatch } from "react-redux";
import { fetchDeals } from "../store/slices/deals";
import { deleteDeal } from "../store/slices/deleteDealSlice";
import Link from "next/link";

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
    <button className="delete-button" onClick={handleDelete}>
      Delete Deal
    </button></Link>

  );
};

export default DeleteDealButton;