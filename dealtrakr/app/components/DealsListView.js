import { useDispatch, useSelector } from "react-redux";
import { useEffect, React } from "react";
import Link from "next/link";
import DealSearch from "./DealSearch";
import { fetchDeals } from "../store/slices/deals";
import AddDealForm from "../deals/new/page";
import DealsKhanBan from "../components/DealsKhanBan";
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
      <tr scope="row" key={deal._id}>
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
      <div className="formActions">
        <DealSearch />
        <AddDealForm />
      </div>
      <table className="table table-light table-striped">
        <thead>
          <tr>
            <th>Deal Name</th>
            <th>Deal Amount</th>
            <th>Close Date</th>
          </tr>
        </thead>
        <tbody>{renderDeals}</tbody>
      </table>
      <div>
        <DealsKhanBan />
      </div>
    </div>
  );
};

export default DealsListView;
