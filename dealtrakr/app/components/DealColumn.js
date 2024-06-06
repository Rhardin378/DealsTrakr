"use client";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Link from "next/link";

const DealColumn = ({ id, name, deals, updateDealIfValidId, isLastColumn, formatDate }) => {
  return (
    <Droppable droppableId={id} key={id}>
      {(provided) => (
        <div
          className={`store ${isLastColumn ? "last-column" : ""}`}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div>
            <h3>{name}</h3>
          </div>
          <div className="center">
            {deals.map((deal, index) => (
              <Draggable key={deal._id} draggableId={deal._id} index={index}>
                {(provided) => (
                  <div
                    className="item card-container"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>

                      <Link href={`/deals/${deal._id}`}>
                        <h2 className="deal-name">{deal.name}</h2>
                      </Link>
                    </div>

                    <span>Amount: <strong>${deal.amount}</strong></span>

                    <div>
                      <span>Close date: <strong>{formatDate(deal.dateClosed)}</strong></span>
                    </div>
                    <div>
                      <img src={deal.company.imageURL} />
                    </div>
                    <div>
                      <button
                        className="set-stage"
                        onClick={() => updateDealIfValidId(deal)}
                      >
                        set stage
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>

          <div className="custom-placeholder">{provided.placeholder}</div>
        </div>
      )}
    </Droppable>
  );
};

export default DealColumn;
