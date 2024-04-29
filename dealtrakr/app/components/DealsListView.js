import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "../store/slices/deals";
import { useEffect, React } from "react";
import { useState } from "react";
import Link from "next/link";
import DealSearch from "./DealSearch";
import axios from "axios";
//searchbar
// table
//pagination component

const DealsListView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);
  const allDeals = useSelector((state) => state.deals.dealsToShow);
  const renderDeals = allDeals.map((deal) => {
    return (
      <tr scope="row">
        <td scope="col">
          <div>
          <span>
            <Link href="#">{deal.name}</Link>
          </span>
          </div>
        </td>
        <td scope="col">
          <span>{deal.amount}</span>
        </td>
        <td scope="col">
          <span>{deal.dateInitiated}</span>
        </td>
        <td scope="col">
          <span>{deal.dateClosed}</span>
        </td>
        <td scope="col">
          <span>{deal.stage}</span>
        </td>
        <td>{deal.company}</td>
      </tr>
    );
  });

  return (
    <div className="container dealsForm">
      <Link href="/deals/new">Add New Deal</Link>

      <DealSearch />
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Deal Name</th>
            <th>Deal Amount</th>
            <th>Date Initiated</th>
            <th>Date Closed</th>
            <th>Deal Stage</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>{renderDeals}</tbody>
      </table>
    </div>
  );
};

export default DealsListView;
