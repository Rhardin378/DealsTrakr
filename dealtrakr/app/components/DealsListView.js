import { useDispatch, useSelector } from "react-redux";
import { useEffect, React } from "react";
import Link from "next/link";
import DealSearch from "./DealSearch";
import { fetchDeals } from "../store/slices/deals";
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
            <Link href={`/deals/${deal._id}`}>{deal.name}</Link>
          </span>
          </div>
        </td>
        <td scope="col">
          <span>{deal.amount}</span>
        </td>
        <td scope="col">
          <span>{deal.dateClosed}</span>
        </td>
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
            <th>Close Date</th>
          </tr>
        </thead>
        <tbody>{renderDeals}</tbody>
      </table>
    </div>
  );
};

export default DealsListView;
