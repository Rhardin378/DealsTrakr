import React from "react";
import { useDispatch } from "react-redux";
import { fetchDeals } from "../store/slices/deals";
import { deleteDeal } from "../store/slices/deleteDealSlice";
import Link from "next/link";
import Button from "react-bootstrap/Button";

const EditDealButton = () => {
  return (
    <Link href='/editdeal'>
    <Button className="edit-button">
      Edit Deal
    </Button></Link>

  );
};

export default EditDealButton;