import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealDetails } from "../store/slices/dealDetailsSlice";
import DeleteDealButton from "./DeleteDealButton";
import { useParams } from "next/navigation";
import Link from "next/link";
import Button from "react-bootstrap/Button";

const dealDetails = () => {
  const { id } = useParams();
  const { dealDetails, loading, error, companyName } = useSelector(
    (state) => state.dealDetails
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDealDetails(id));
  }, [dispatch, id]);
  

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  if (loading === "failed") {
    return <div>Error: {error}</div>; // Use error from Redux state
  }

  if (!dealDetails) {
    return <div>No deal details found</div>;
  }

  return (
    <div className="deal-details">
      <br />
      <p>
        <strong>Name:</strong> {dealDetails.name}
      </p>
      <p>
        <strong>Amount:</strong> {dealDetails.amount}
      </p>
      <p>
        <strong>Date Initiated:</strong> {dealDetails.dateInitiated}
      </p>
      <p>
        <strong>Date Closed:</strong> {dealDetails.dateClosed}
      </p>
      <p>
        <strong>Stage:</strong> {dealDetails.stage}
      </p>
      <p>
        <strong>Company:</strong> {companyName}
      </p>
      <DeleteDealButton dealId={dealDetails._id} />
      <br />
      <Link href="/dashboard">
        <Button className="back-button">Back to Dashboard</Button>
      </Link>
      <br />
      <br />
      <br />
    </div>
  );
};

export default dealDetails;
