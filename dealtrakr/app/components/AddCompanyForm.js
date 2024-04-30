'use client'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Link from "next/link";
import { addCompany } from "../store/slices/addCompanySlice";
import { useDispatch } from "react-redux";



const AddCompany = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [companyOwner, setCompanyOwner] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [imageURL, setImageURL] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();


  const handleAddCompanySubmit = (e) => {
    e.preventDefault();
    dispatch(addCompany({ // Dispatch the addCompany action with the company data
      id,
      name,
      companyOwner,
      phoneNumber,
      city,
      state,
      country,
      dateCreated,
      imageURL,
      deals: []
    })).then(() => {
      router.push("/dashboard");
    }).catch(error => {
      console.error("Could not add your company:", error)
    });
  };

  return (
    <div className="add-company-form-container">
    <form onSubmit={handleAddCompanySubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Company Owner:
        <input type="text" value={companyOwner} onChange={(e) => setCompanyOwner(e.target.value)} />
      </label>
      <label>
        Phone Number:
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <label>
        State:
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      </label>
      <label>
        Country:
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
      </label>         
      <label>
        Date Created:
        <input type="text" value={dateCreated} onChange={(e) => setDateCreated(e.target.value)} />
      </label>
      <label>
        Company Image URL:
        <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
      </label>
      <button type="submit" className="add-company-button">Add Company</button>
      <Link href="/dashboard">
        <button className="add-company-button">Back</button>
      </Link>
    </form>
    </div>
  );
};

export default AddCompany;