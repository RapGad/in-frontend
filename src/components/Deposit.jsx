import React,{ useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startPayment } from '../redux/paymentSlice';

const Deposit = () => {

  const [amount, setAmount] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.payment);
  const dispatch = useDispatch();

  const handleDeposit = async(e) => {

    if(error){
      return <p>Error: {error}</p>
    }
    // Here you can handle the actual deposit logic
    e.preventDefault();
    try {
      const paymentData = {
        user: user._id,
        type: "Deposit",
        status: "Completed",
        amount
      }

      const action = await dispatch(startPayment(paymentData));
      window.open(action.payload,"_blank")
      
    } catch (error) {
      console.log(error);
      
    }


  };

  return (
    <div className="container p-4">
      <h2 className="mb-4 text-light">Deposit Funds</h2>
      <div className="card bg-dark text-light p-4">
        <form onSubmit={handleDeposit}>
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
            {loading ? "Processing..." : " Deposit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Deposit
