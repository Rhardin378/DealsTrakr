"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addDeal } from "../store/slices/addDealSlice";
import { useDispatch } from "react-redux";
import { fetchDeals } from "../store/slices/deals";

const AddDealsForm = () => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dateClosed, setdateClosed] = useState("");
  const [dateInitiated, setDateInitiated] = useState("");
  const [stage, setStage] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleStage = (e) => {
    const stageToSelect = e.target.value;
    setStage(stageToSelect);
  };

  const handleAddDealSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addDeal({
        id,
        name,
        amount,
        dateClosed,
        dateInitiated,
        stage,
      })
    );
    handleClose();
    dispatch(fetchDeals());
  };

  return (
    <>
      <Button className="add-deal-button" onClick={handleShow}>
        Add Deal
      </Button>

      <Modal 
        show={show} 
        onHide={handleClose} 
        backdrop="static" 
        keyboard={false}
        size="lg"
      >

        <Modal.Header closeButton>
          <Modal.Title>Add Deal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="add-deal-form-container">
          <form>
            <label className="form-label-mb2">
              Name:
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="form-label mb-2">Deal Amount:</label>
            <input
              className="form-control"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label className="form-label mb-2">Date Initiated:</label>
            <input
              type="date"
              value={dateInitiated}
              onChange={(e) => setDateInitiated(e.target.value)}
            />
            <label>Date Closed:</label>
            <input
              className="form-control w-100"
              type="date"
              value={dateClosed}
              onChange={(e) => setdateClosed(e.target.value)}
            />
            <label className="form-label mb-2">
              Stage:
              <select value={stage} onChange={handleStage}>
                <option value="initiated">Initiated</option>
                <option value="qualified">Qualified</option>
                <option value="contract sent">Contract Sent</option>
                <option value="closed won">Closed Won</option>
                <option value="closed lost">Closed Lost</option>
              </select>
            </label>
          </form>
        </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
          className="add-company-button"
          onClick={handleAddDealSubmit}
          type="button"
          >
            Add Deal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddDealsForm;
