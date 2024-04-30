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
  const [dateClosed, setdateClosed] = useState('');
  const [dateInitiated, setDateInitiated] = useState('');
  const [stage, setStage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  
  const handleStage = (e) => {
    const stageToSelect = e.target.value;
    setStage(stageToSelect) 
  }
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
    // fix classnames in components
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
        {/* remove from form on backend */}
        Date Initiated:
        <input type="date" value={dateInitiated} onChange={(e) => setDateInitiated(e.target.value)} />
      </label>
      <label>
        Date Closed:
        <input type="date" value={dateClosed} onChange={(e) => setdateClosed(e.target.value)} />
      </label>
      <label>
        Stage:
        {/* <input type="option" value={stage} onChange={(e) => setStage(e.target.value)} /> */}

        {/* "initiated", "qualified", "contract sent", "closed won", "closed lost" */}
        <select className="" onChange={handleStage}>
          <option value="initiated">initiated</option>
          <option value="qualified">qualified</option>
          <option value="contract sent">contract sent</option>
          <option value="closed won">closed won</option>
          <option value="closed lost">closed lost</option>
        </select>

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