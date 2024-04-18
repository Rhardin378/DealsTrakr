import { useState } from "react";
import { companiesAPI } from "../data/companiesAPI";
import Link from "next/link";
import CompanySearch from "./CompanySearch";
//searchbar
// table
//pagination component

const CompaniesListView = () => {
  const [allCompanies, _] = useState(companiesAPI.getAll());

  const renderCompanies = allCompanies.map((company) => {
    return (
      <tr scope="row">
        <td scope="col">
          <div>
            <img src={company.imageURL} placeholder={company.name} />
            <span>
              <Link href="#">{company.name}</Link>
            </span>
          </div>
        </td>
        <td scope="col">
          <span>{company.companyOwner}</span>
        </td>
        <td scope="col">
          <span>{company.dateCreated}</span>
        </td>
        <td scope="col">
          <span>{company.phoneNumber}</span>
        </td>
        <td scope="col">
          <span>{company.city}</span>
        </td>
        <td>{company.state}</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <CompanySearch />
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Company Owner</th>
            <th>Create Date</th>
            <th>Phone Number</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>{renderCompanies}</tbody>
      </table>
    </div>
  );
};

export default CompaniesListView;
