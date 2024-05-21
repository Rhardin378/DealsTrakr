// // want my data to be deals fetch deals
// // each category can be mapped to a droppable column
// // each deal will be mapped as a droppable
// // on dragEnd should handle re ordering and sending a post request based on the column

// // initiated
// //qualified
// //contract sent
// //closed won
// //closed lost

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchDeals, editDeal } from "../store/slices/deals";
import { useDispatch, useSelector } from "react-redux";

// let deals = [
//   {
//     id: "initiated",
//     name: "Initiated",
//     deals: [...initiatedDeals],
//   },
//   {
//     id: "qualified",
//     name: "qualified",
//     deals: [...qualifiedDeals],
//   },
//   {
//     id: "contract_sent",
//     name: "Contract Sent",
//     deals: [...contractSentDeals],
//   },
//   {
//     id: "closed_won",
//     name: "Closed Won",
//     deals: [...closedWonDeals],
//   },
//   {
//     id: "closed_lost",
//     name: "Closed Lost",
//     deals: [...closedLostDeals],
//   },
// ];

// structure data imported from store
const DATA = [
  {
    // id has to be stage name so that i can use the the  destination to make a put request using the "id"
    id: "initiated",
    name: "Initiated",
    //deals
    items: [
      //deal
      //sourceDraggableId will be passed into our editDealSlice (id, droppableID)
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
  },
  {
    id: "qualified",
    name: "Qualified",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
  },
  {
    id: "contract_sent",
    name: "Contract Sent",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
  },
  {
    id: "closed_won",
    name: "Closed Won",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eafc", name: "Nike" },
      { id: "d3edf796-6449-4931-a777-ff66965a024b", name: "espn" },
    ],
  },
  {
    id: "closed_lost",
    name: "Closed Lost",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eafq", name: "Pals" },
      { id: "d3edf796-6449-4931-a777-ff66965a024z", name: "Burger mart" },
    ],
  },
];

const DealsKhanBan = () => {
  const [stores, setStores] = useState(DATA);
  const [deals, setDeals] = useState([]);

  const dealData = useSelector((state) => state.deals.dealsToShow);
  const status = useSelector((state) => state.deals.status);
  const error = useSelector((state) => state.deals.error);
  const dispatch = useDispatch();
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
      {
        id: "initiated",
        name: "Initiated",
        deals: initiated,
      },
      {
        id: "qualified",
        name: "qualified",
        deals: qualified,
      },
      {
        id: "contract_sent",
        name: "Contract Sent",
        deals: contractSent,
      },
      {
        id: "closed_won",
        name: "Closed Won",
        deals: closedWon,
      },
      {
        id: "closed_lost",
        name: "Closed Lost",
        deals: closedLost,
      },
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
      let initiated = dealData.filter((deal) => deal.stage == "Initiated");
      console.log(initiated);
      let qualified = dealData.filter((deal) => deal.stage == "Qualified");
      console.log(qualified);

      let contractSent = dealData.filter(
        (deal) => deal.stage == "Contract Sent"
      );
      console.log(contractSent);

      let closedWon = dealData.filter((deal) => deal.stage == "Closed Won");
      console.log(closedWon);

      let closedLost = dealData.filter((deal) => deal.stage == "Closed Lost");
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
    console.log(result);
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
      // put request still not working correctly
      const stage = { stage: destination.droppableId };
      console.log(draggableId, stage);

      dispatch(editDeal({ draggableId, stage })).then(() => {
        setDeals(newDeals);
        // dispatch(fetchDeals());
      });
    }

    // Post request example
    // fetch("/api/update-deal-stage", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ id: movedItem.id, stage: destination.droppableId }),
    // });
  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className="columns">
            {deals.map((deal, index) => (
              <Droppable droppableId={deal.id} key={deal.id}>
                {(provided) => (
                  <div
                    className="store"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h3>{deal.name}</h3>
                    {deal.deals.map((deal, index) => (
                      <Draggable
                        key={deal._id}
                        draggableId={deal._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {deal.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DealsKhanBan;
