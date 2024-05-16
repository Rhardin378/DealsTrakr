// // want my data to be deals fetch deals
// // each category can be mapped to a droppable column
// // each deal will be mapped as a droppable
// // on dragEnd should handle re ordering and sending a post request based on the column

// // initiated
// //qualified
// //contract sent
// //closed won
// //closed lost

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchDeals } from "../store/slices/deals";
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

  const handleDragAndDrop = (result) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceStage = stores.find((store) => store.id === source.droppableId);
    const destinationStage = stores.find(
      (store) => store.id === destination.droppableId
    );

    const sourceItems = Array.from(sourceStage.items);
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      const newStores = stores.map((store) =>
        store.id === source.droppableId
          ? { ...store, items: sourceItems }
          : store
      );
      setStores(newStores);
    } else {
      const destinationItems = Array.from(destinationStage.items);
      destinationItems.splice(destination.index, 0, movedItem);
      const newStores = stores.map((store) =>
        store.id === source.droppableId
          ? { ...store, items: sourceItems }
          : store.id === destination.droppableId
          ? { ...store, items: destinationItems }
          : store
      );
      setStores(newStores);
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
            {stores.map((store, index) => (
              <Droppable droppableId={store.id} key={store.id}>
                {(provided) => (
                  <div
                    className="store"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h3>{store.name}</h3>
                    {store.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.name}
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
