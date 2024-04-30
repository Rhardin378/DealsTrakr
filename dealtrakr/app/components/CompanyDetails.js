import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyDetails } from "../store/slices/companyDetailsSlice";
import { useParams } from "next/navigation";
import Link from "next/link";

const CompanyDetails = () => {
  const { id } = useParams();
  const { companyDetails, loading, error } = useSelector((state) => state.companyDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompanyDetails(id));
  }, [dispatch, id]);

  if (loading === 'loading') {
    return <div>Loading...</div>;
  }

  if (loading === 'failed') {
    return <div>Error: {error}</div>; // Use error from Redux state
  }

  if (!companyDetails) {
    return <div>No company details found</div>;
  }

  return (
    <div className="company-details">
      <p>Name: {companyDetails.name}</p>
      <p>Company Owner: {companyDetails.companyOwner}</p>
      <p>Date Created: {companyDetails.dateCreated}</p>
      <p>Phone Number: {companyDetails.phoneNumber}</p>
      <p>City: {companyDetails.city}</p>
      <p>State: {companyDetails.state}</p>
      <Link href="/dashboard">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default CompanyDetails;