import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealDetails } from "../store/slices/dealDetailsSlice";
import { useParams } from "next/navigation";
import Link from "next/link";

const dealDetails = () => {
  const { id } = useParams();
  const { dealDetails, loading, error } = useSelector((state) => state.dealDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDealDetails(id));
  }, [dispatch, id]);

  if (loading === 'loading') {
    return <div>Loading...</div>;
  }

  if (loading === 'failed') {
    return <div>Error: {error}</div>; // Use error from Redux state
  }

  if (!dealDetails) {
    return <div>No deal details found</div>;
  }

  return (
    <div className="deal-details">
      <br/>
      <p><strong>Name:</strong> {dealDetails.name}</p>
      <p><strong>Amount:</strong> {dealDetails.amount}</p>
      <p><strong>Date Initiated:</strong> {dealDetails.dateInitiated}</p>
      <p><strong>Date Closed:</strong> {dealDetails.dateClosed}</p>
      <p><strong>Stage:</strong> {dealDetails.stage}</p>
      <Link href="/dashboard">
        <button className="back-button">Back to Dashboard</button>
      </Link>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default dealDetails;