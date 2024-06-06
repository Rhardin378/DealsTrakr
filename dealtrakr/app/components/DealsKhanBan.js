import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchDeals, editDeal } from "../store/slices/deals";
import DealColumn from "./DealColumn";
import { useDispatch, useSelector } from "react-redux";

const DealsKhanBan = () => {
  const [deals, setDeals] = useState([]);
  const [updatedDeal, setUpdatedDeal] = useState({});
  const [categoryToUpdate, setCategoryToUpdate] = useState("");
  const [idOfDealToUpdate, setIdOfDealToUpdate] = useState("");
  const dealData = useSelector((state) => state.deals.dealsToShow);
  const status = useSelector((state) => state.deals.status);
  const error = useSelector((state) => state.deals.error);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (error) {
    console.log(error);
  }

  const formatDealData = (
    initiated,
    qualified,
    contractSent,
    closedWon,
    closedLost
  ) => {
    let deals = [
      { id: "initiated", name: "Initiated", deals: initiated },
      { id: "qualified", name: "Qualified", deals: qualified },
      { id: "contract_sent", name: "Contract Sent", deals: contractSent },
      { id: "closed_won", name: "Closed Won", deals: closedWon },
      { id: "closed_lost", name: "Closed Lost", deals: closedLost },
    ];
    setDeals(deals);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDeals());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      let initiated = dealData.filter((deal) => deal.stage == "initiated");

      console.log(initiated);
      let qualified = dealData.filter((deal) => deal.stage == "qualified");
      console.log(qualified);

      let contractSent = dealData.filter(
        (deal) => deal.stage == "contract_sent"
      );
      console.log(contractSent);

      let closedWon = dealData.filter((deal) => deal.stage == "closed_won");
      console.log(closedWon);

      let closedLost = dealData.filter((deal) => deal.stage == "closed_lost");
      console.log(closedLost);

      formatDealData(initiated, qualified, contractSent, closedWon, closedLost);
    }
  }, [status, dealData]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleDragAndDrop = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceStage = deals.find((deal) => deal.id === source.droppableId);
    const destinationStage = deals.find(
      (deal) => deal.id === destination.droppableId
    );

    const sourceItems = Array.from(sourceStage.deals);
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);

      const newDeals = deals.map((deal) =>
        deal.id === source.droppableId ? { ...deal, deals: sourceItems } : deal
      );
      setDeals(newDeals);
    } else {
      const destinationItems = Array.from(destinationStage.deals);
      destinationItems.splice(destination.index, 0, movedItem);

      const newDeals = deals.map((deal) =>
        deal.id === source.droppableId
          ? { ...deal, deals: sourceItems }
          : deal.id === destination.droppableId
          ? { ...deal, deals: destinationItems }
          : deal
      );
      setCategoryToUpdate(destination.droppableId);
      setDeals(newDeals);
      // put request still not working correctly
      let dealupdatedDeal = dealData.find((deal) => deal._id === draggableId);
      console.log(dealupdatedDeal);
      // updatedDeal.stage = destination.droppableId;
      setUpdatedDeal({ ...dealupdatedDeal, stage: destination.droppableId });

      const stage = { stage: destination.droppableId };
      console.log(draggableId, stage);
      console.log(updatedDeal);

      // .then(() => {
      // //   setDeals(newDeals);
      //   // dispatch(fetchDeals());
      // });
    }
  };

  const updateDealIfValidId = (deal) => {
    if (deal._id !== updatedDeal._id) {
      console.log("can't do that");
      return;
    } else {
      dispatch(
        editDeal({
          dealId: deal._id,
          dealData: updatedDeal,
        })
      ).then(() => dispatch(fetchDeals()));
      setUpdatedDeal({});
    }
  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className="columns">
            {deals.map((deal, index) => {
              const isLastColumn = index === deals.length - 1;
              return (
                <DealColumn
                  key={deal.id}
                  id={deal.id}
                  name={deal.name}
                  deals={deal.deals}
                  updateDealIfValidId={updateDealIfValidId}
                  isLastColumn={isLastColumn}
                />
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DealsKhanBan;
