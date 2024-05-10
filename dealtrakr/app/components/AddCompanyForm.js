"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import { addCompany } from "../store/slices/addCompanySlice";
import { fetchCompanies } from "../store/slices/companies";
import { useDispatch } from "react-redux";

const AddCompany = () => {
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
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddCompanySubmit = (e) => {
    e.preventDefault();
    dispatch(
      addCompany({
        // Dispatch the addCompany action with the company data
        id,
        name,
        companyOwner,
        phoneNumber,
        city,
        state,
        country,
        dateCreated,
        imageURL,
        deals: [],
      })
    ).then((data) => {
      dispatch(fetchCompanies());
    });
    handleClose();
    setName("");
    setCompanyOwner("");
    setPhoneNumber(""), setCity("");
    setState("");
    setCountry("");
    setDateCreated("");
    setImageURL("");
  };

  return (
    <>
      <Button className="add-company-button" onClick={handleShow}>
        Add Company
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-company-form-container">
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

              <label>Date Created:</label>
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
            onClick={handleAddCompanySubmit}
            type="button"
          >
            Add Company
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCompany;
