import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyDetails } from "../store/slices/companyDetailsSlice";
import { useParams } from "next/navigation";
import Link from "next/link";
import DeleteCompanyButton from "./DeleteCompanyButton";
import Button from "react-bootstrap/Button";

const CompanyDetails = () => {
  const { id } = useParams();
  const { companyDetails, loading, error } = useSelector((state) => state.companyDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompanyDetails(id));
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
      <div>
      <br/>
      <img className="company-details-img" src={companyDetails.imageURL}></img>
      </div>
      <br/>
      <p><strong>Company Owner:</strong> {companyDetails.companyOwner}</p>
      <p><strong>Date Created:</strong> {formatDate(companyDetails.dateCreated)}</p>
      <p><strong>Phone Number:</strong> {companyDetails.phoneNumber}</p>
      <p><strong>City:</strong> {companyDetails.city}</p>
      <DeleteCompanyButton companyId={companyDetails._id}/>
      <br/>
      <Link href="/dashboard">
        <Button className="back-button">Back to Dashboard</Button>
      </Link>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default CompanyDetails;