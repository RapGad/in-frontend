import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInvestmentPlans } from "../redux/investmentSlice";
import { purchaseInvestment } from "../redux/purchaseSlice";
import Loading from "./Loading";
import { Modal } from "react-bootstrap";

const Investment = () => {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvestmentPlans());
  }, []);

  const  error = useSelector((state) => state.investment.error);

  const handleInvestmentClick = async(investmentId) => {
    const response = confirm("Are you sure you want to purchase this plan?");
    if (!response) {
      return;
    }

    const data =await dispatch(purchaseInvestment({ investmentId }));
    alert(data.payload.message)
  };

  const investmentPlans = useSelector(
    (state) => state.investment.investmentPlans
  );


  if(error){
    return <p>Error: {error}</p>
  }

  const loading = useSelector((state) => state.investment.loading);
  return (
    <div className="container">
      <h2 className="mb-4 text-light">My Investment Plans</h2>
      {loading ? (
        <Loading/>
      ) : (
        <div className="row">
          {investmentPlans.map((investment) => (
            <div
              key={investment._id}
              className="col-md-4"
              onClick={() => handleInvestmentClick(investment._id)}
            >
              <div className="card bg-dark text-light p-3 mb-3 shadow-lg">
                <h4 className="card-title">{investment.name}</h4>
                <p className="mb-1">
                  <strong>Price</strong> {investment.amount}
                </p>
                <p className="mb-1">
                  <strong>Returns:</strong> {investment.returns}
                </p>
                <p className="mb-1">
                  <strong>Duration: </strong> {investment.Duration} days
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Investment;
