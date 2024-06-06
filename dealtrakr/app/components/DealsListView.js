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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className=" dealsForm">
      <div className=" formActions formActions-deals">
        <DealSearch />
        <AddDealForm />
      </div>
      <div>
        <DealsKhanBan />
      </div>
    </div>
  );
};

export default DealsListView;
