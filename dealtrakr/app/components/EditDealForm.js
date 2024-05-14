import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addDeal } from "../store/slices/addDealSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "../store/slices/deals";
import { fetchCompanies } from "../store/slices/companies";
import { fetchDealDetails } from "../store/slices/dealDetailsSlice";
import { editDeal } from "../store/slices/editDealSlice";

const EditDealsForm = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dateClosed, setdateClosed] = useState("");
  const [dateInitiated, setDateInitiated] = useState("");
  const [stage, setStage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companiesToShow);
  const { dealDetails, loading, error, companyName } = useSelector(
    (state) => state.dealDetails
  );

  useEffect(() => {
    // Fetch companies when component mounts
    dispatch(fetchCompanies());
  }, [dispatch]); // Dependency array to ensure useEffect runs only once


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleStage = (e) => {
    const stageToSelect = e.target.value;
    setStage(stageToSelect);
  };

  const handleEditDealSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editDeal({
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
      <Button className="edit-deal-button" onClick={handleShow}>
        Edit Deal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Deal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-deal-form-container">
            <form>
              <label className="form-label-mb2">
                Name:
                <input
                  className="form-control"
                  type="text"
                  value={dealDetails.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="form-label mb-2">Deal Amount:</label>
              <input
                className="form-control"
                type="text"
                value={dealDetails.amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <label className="form-label mb-2">Date Initiated:</label>
              <input
                type="date"
                value={dealDetails.dateInitiated}
                onChange={(e) => setDateInitiated(e.target.value)}
              />
              <label>Date Closed:</label>
              <input
                className="form-control w-100"
                type="date"
                value={dealDetails.dateClosed}
                onChange={(e) => setdateClosed(e.target.value)}
              />
              <label className="form-label mb-2">
                Stage:
                <select value={dealDetails.stage} onChange={handleStage}>
                  <option value="initiated">Initiated</option>
                  <option value="qualified">Qualified</option>
                  <option value="contract sent">Contract Sent</option>
                  <option value="closed won">Closed Won</option>
                  <option value="closed lost">Closed Lost</option>
                </select>
              </label>
              <label>Select Company:</label>
              <select
                value={companyName}
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
            onClick={handleEditDealSubmit}
            type="button"
          >
            Add Deal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditDealsForm;
