"use client";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Link from "next/link";

const DealColumn = ({ id, name, deals, updateDealIfValidId, isLastColumn }) => {
  return (
    <Droppable droppableId={id} key={id}>
      {(provided) => (
        <div
          className={`store ${isLastColumn ? "last-column" : ""}`}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div></div>
          <h3>{name}</h3>
          {deals.map((deal, index) => (
            <Draggable key={deal._id} draggableId={deal._id} index={index}>
              {(provided) => (
                <div
                  className="item"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div>
                    <Link href={`/deals/${deal._id}`}>{deal.name}</Link>
                    <div>
                      <span>Amount: ${deal.amount}</span>
                    </div>
                    <div>
                      {" "}
                      <span>Close date: {deal.dateClosed}</span>
                    </div>
                    <div>
                      <img src={deal.company.imageURL} />
                    </div>
                    <button onClick={() => updateDealIfValidId(deal)}>
                      set stage
                    </button>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DealColumn;
