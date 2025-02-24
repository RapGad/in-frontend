import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../redux/transactionSlice";
import Loading from "./Loading";

const Transaction = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const { transactions, loading, error } = useSelector(
    (state) => state.transaction
  );


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container p-4">
      <h2 className="mb-4 text-light">Transaction History</h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="table-responsive">
          {transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={txn.id}>
                    <td>{index + 1}</td>
                    <td>{txn.type}</td>
                    <td>{txn.amount}</td>
                    <td>{new Date(txn.date).toDateString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          txn.status === "Completed"
                            ? "bg-success"
                            : txn.status === "Pending"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Transaction;
