import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addDeal } from "../store/slices/addDealSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "../store/slices/deals";
import { fetchCompanies } from "../store/slices/companies"; // Import the fetchCompanies action creator

const AddDealsForm = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dateClosed, setdateClosed] = useState("");
  const [dateInitiated, setDateInitiated] = useState("");
  const [stage, setStage] = useState("Initiated");
  const [selectedCompany, setSelectedCompany] = useState("");
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companiesToShow); // Corrected selector for companies

  useEffect(() => {
    // Fetch companies when component mounts
    dispatch(fetchCompanies());
  }, [dispatch]); // Dependency array to ensure useEffect runs only once

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleStage = (e) => {
    setStage(e.target.value);
  };

  const handleAddDealSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addDeal({
        name,
        amount,
        dateClosed,
        dateInitiated,
        stage,
        company: selectedCompany,
      })
    ).then((data) => {
      dispatch(fetchDeals());
    });
    handleClose();
    setName("");
    setAmount("");
    setdateClosed("");
    setDateInitiated("");
    setStage("");
    setSelectedCompany("");
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
                  <option value="Initiated">Initiated</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Contract Sent">Contract Sent</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </label>
              <label>Select Company:</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
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
