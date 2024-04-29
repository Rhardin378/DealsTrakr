'use client'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Link from "next/link";
import { addDeal } from "../store/slices/addDealSlice";
import { useDispatch } from "react-redux";


const AddDeal = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dateClosed, setDateClosed] = useState('');
  const [dateInitiated, setDateInitiated] = useState('');
  const [stage, setStage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();


  const handleAddDealSubmit = (e) => {
    e.preventDefault();
    dispatch(addDeal({ // Dispatch the addDeal action with the deal data
      id,
      name,
      amount,
      dateClosed,
      dateInitiated,
      stage
    })).then(() => {
      router.push("/dashboard");
    }).catch(error => {
      console.error("Could not add your deal:", error)
    });
  };

  return (
    <div className="add-company-form-container">
    <form onSubmit={handleAddDealSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Deal Amount:
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>
        Date Initiated:
        <input type="text" value={dateInitiated} onChange={(e) => setDateInitiated(e.target.value)} />
      </label>
      <label>
        Date Closed:
        <input type="text" value={dateClosed} onChange={(e) => setDateClosed(e.target.value)} />
      </label>
      <label>
        Stage:
        <input type="text" value={stage} onChange={(e) => setStage(e.target.value)} />
      </label>
      <button type="submit" className="add-company-button">Add Deal</button>
      <Link href="/dashboard">
        <button className="add-company-button">Back</button>
      </Link>
    </form>
    </div>
  );
};

export default AddDeal;