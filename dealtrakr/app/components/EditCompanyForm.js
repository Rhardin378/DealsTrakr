"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { fetchCompanies } from "../store/slices/companies";
import { fetchCompanyDetails } from "../store/slices/companyDetailsSlice";
import { useDispatch } from "react-redux";
import { editCompany } from "../store/slices/editCompanySlice";

const EditCompany = () => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [companyOwner, setCompanyOwner] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { companyDetails } = useSelector((state) => state.companyDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  // Select the list of companies from the Redux store
  const companies = useSelector((state) => state.companies.companiesToShow);

  const handleClose = () => {
    dispatch(fetchCompanyDetails(companyDetails._id));
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    // Set initial values from companyDetails when it changes
    if (companyDetails) {
      setId(companyDetails.id);
      setName(companyDetails.name);
      setCompanyOwner(companyDetails.companyOwner);
      setPhoneNumber(companyDetails.phoneNumber);
      setCity(companyDetails.city);
      setState(companyDetails.state);
      setCountry(companyDetails.country);
      setDateCreated(companyDetails.dateCreated);
      setImageURL(companyDetails.imageURL);
    }
  }, [companyDetails]);

  const handleEditCompanySubmit = (e) => {
    e.preventDefault();
    const companyId = companyDetails._id;
    const companyData = {
      id,
      name,
      companyOwner,
      phoneNumber,
      city,
      state,
      country,
      dateCreated,
      imageURL,
    };
    dispatch(editCompany({ companyId, companyData })).then(() => {
      dispatch(fetchCompanies());
      handleClose();
    });
  };

  return (
    <>
      <Button className="edit-button" onClick={handleShow}>
        Edit Company
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-company-form-container">
            <div
              className="error-message"
              style={{ color: "red", marginBottom: "5px" }}
            >
              {errorMessage}
            </div>
            <form>
              <label className="form-label mb-2">Name:</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="form-label mb-2">Company Owner:</label>
              <input
                className="form-control"
                type="text"
                value={companyOwner}
                onChange={(e) => setCompanyOwner(e.target.value)}
              />

              <label className="form-label mb-2">Phone Number:</label>
              <input
                className="form-control w-100"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <label className="form-label mb-2">City:</label>
              <input
                className="form-control w-100"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <label className="form-label mb-2">State:</label>

              <input
                className="form-control w-100"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <label>Country:</label>
              <input
                className="form-control w-100"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />

              <label>
                Date Created:{" "}
                <strong>{formatDate(companyDetails.dateCreated)}</strong>
              </label>
              <input
                className="form-control"
                type="date"
                value={dateCreated}
                onChange={(e) => setDateCreated(e.target.value)}
              />

              <label>Company Image URL:</label>
              <input
                className="form-control w-100"
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="add-company-button"
            onClick={handleEditCompanySubmit}
            type="button"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCompany;
