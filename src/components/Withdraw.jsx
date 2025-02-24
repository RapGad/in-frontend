import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { initiateWithdrawal } from "../redux/withdrawSlice";
import Modal from "./Modal";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { loading, error} = useSelector((state) => state.withdrawal);


  const handleWithdraw = async(e) => {
    e.preventDefault();

    const paymentData = {
      network,
      phone,
      name,
      amount,
    };

    const response = await dispatch(initiateWithdrawal(paymentData));


    if (response.payload.message) {
      alert(response.payload.message);
      setAmount("");
      setNetwork("");
      setPhone("");
      setName("");
      setAmount("");

    }


    if(error){
      return <p>Error: {error}</p>
    }

  };

  return (
    <div className="container p-4">
      <h2 className="mb-4 text-light">Deposit Funds</h2>
      <div className="card bg-dark text-light p-4">
        <form onSubmit={handleWithdraw}>
          {/* Network Provider Selection */}
          <div className="mb-3">
            <label className="form-label">Select Network Provider</label>
            <select
              className="form-select"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <option value="MTN">MTN</option>
              <option value="Vodafone">Vodafone</option>
              <option value="AirtelTigo">AirtelTigo</option>
            </select>
          </div>

          {/* Phone Number Input */}

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Recipient name</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Recipient Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* Amount Input */}
          <div className="mb-3">
            <label className="form-label">Amount ($)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            {loading ? 'Processing...' : 'Withdraw'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
