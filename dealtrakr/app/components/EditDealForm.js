import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals, editDeal } from "../store/slices/deals";
import { fetchCompanies } from "../store/slices/companies";
import { fetchDealDetails } from "../store/slices/dealDetailsSlice";

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
  const { dealDetails, companyName } = useSelector(
    (state) => state.dealDetails
  );

  useEffect(() => {
    // Fetch companies when component mounts
    dispatch(fetchCompanies());
  }, [dispatch]); // Dependency array to ensure useEffect runs only once

  useEffect(() => {
    // Set initial values from dealDetails
    if (dealDetails) {
      setName(dealDetails.name);
      setAmount(dealDetails.amount);
      setdateClosed(dealDetails.dateClosed);
      setDateInitiated(dealDetails.dateInitiated);
      setStage(dealDetails.stage);
      setSelectedCompany(dealDetails.company);
    }
  }, [dealDetails]);

  const handleClose = () => {
    dispatch(fetchDealDetails(dealDetails._id)); // Fetch deal details when edited
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleStage = (e) => {
    const stageToSelect = e.target.value;
    setStage(stageToSelect);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEditDealSubmit = (e) => {
    e.preventDefault();
    const dealId = dealDetails._id;
    const dealData = {
      name,
      amount,
      dateClosed,
      dateInitiated,
      stage,
      company: selectedCompany,
    };
    dispatch(editDeal({ dealId, dealData })).then(() => {
      dispatch(fetchDeals());
      handleClose();
    });
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
              <label className="form-label mb-2">
                Date Initiated:{" "}
                <strong>{formatDate(dealDetails.dateInitiated)}</strong>
              </label>
              <input
                className="form-control"
                type="date"
                value={dateInitiated}
                onChange={(e) => setDateInitiated(e.target.value)}
              />
              <label className="form-label mb-2">
                Date Closed:{" "}
                <strong>{formatDate(dealDetails.dateClosed)}</strong>
              </label>
              <input
                className="form-control"
                type="date"
                value={dateClosed}
                onChange={(e) => setdateClosed(e.target.value)}
              />
              <label className="form-label mb-2">
                Stage:
                <select
                  className="form-select"
                  value={stage}
                  onChange={handleStage}
                >
                  <option value="Initiated">Initiated</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Contract Sent">Contract Sent</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </label>
              <label className="form-label mb-2">
                Company:
                <select
                  className="form-select"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  <option value="">{companyName}</option>
                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
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
            onClick={handleEditDealSubmit}
            type="button"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditDealsForm;
