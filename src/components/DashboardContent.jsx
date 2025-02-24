import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector,shallowEqual } from 'react-redux';
import { getDetails } from '../redux/userInvestmentSlice';
import Loading from './Loading';

const DashboardContent = () => {

  // Mock investment data (Replace this with API data)


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails());
  }, [dispatch]);

  const {userDetails, loading, error} = useSelector(state => state.userDetails,shallowEqual);

  if(error){
    return <p>Error: Unexpected error </p>
  }




  return (
    <div className="container">
      <h2 className="mb-4 text-light">My Investment Plans</h2>
      <div className="row">
        
        {
          loading ? (
            <Loading />
          ) : (
            userDetails.length > 0 ? (userDetails.map((investment) => (
              <div key={investment._id} className="col-md-4">
                <div className="card bg-dark text-light p-3 mb-3 shadow-lg">
                  <h4 className="card-title">{investment.plan}</h4>
                  <p className="mb-1"><strong>Amount Invested:</strong> GHS{investment.amountInvested}</p>
                  <p className="mb-1"><strong>Returns:</strong> GHS{investment.returns}</p>
                  <p className="mb-1"><strong>Start Date:</strong> {new Date(investment.startDate).toDateString()}</p>
                  <p className="mb-1"><strong>End Date:</strong> {new Date(investment.endDate).toDateString()}</p>
                  <p className="mb-1">
                    <strong>Status:</strong> 
                    <span className={`badge ms-2 ${investment.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                      {investment.status}
                    </span>
                  </p>
                </div>
              </div>
            ))) : (
              <p>No investments found.</p>
            )
            
          )
          
        }
       
      </div>
    </div>
  )
}

export default DashboardContent
