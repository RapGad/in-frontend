import React, { useState, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getUserBalance } from '../redux/balanceSlice';
import Loading from './Loading';
const Balance = () => {
  const dispatch = useDispatch();

  // Mock balance data (Replace this with API data)
  useEffect(() => {
    dispatch(getUserBalance());
  }, []);

  const {balance,loading, error} = useSelector(state => state.balance);

  if(error){
    return <p>Error: {error}</p>
  }
  return (
    <div className="container">
    <h2 className="mb-4 text-light">Account Balance</h2>
    <div className="d-flex justify-content-center">
      {
        loading ? (
          <Loading />
        ) : (
          <div className="card bg-dark text-light p-4 shadow-lg text-center" style={{ width: "350px" }}>
            <h4>Total Balance</h4>
            <h1 className="display-4">GHS {balance}</h1>
            <p className="text-muted">Available funds for investment & withdrawal</p>
          </div>
        )
      }
    </div>
  </div>
  )
}

export default Balance
