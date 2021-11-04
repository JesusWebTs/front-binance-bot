import React, { useState, useEffect } from "react";
import "./styles.css";
import { Tile } from "./components";

function TransactionList({ transactions }) {
  const [_transactions, setTransactions] = useState([]);

  useEffect(() => {
    let transactionArr = [];

    for (const key in transactions) {
      if (Object.hasOwnProperty.call(transactions, key)) {
        const element = transactions[key];
        transactionArr.push({ ...element, _id: key });
      }
    }
    setTransactions(transactionArr);

    return () => {};
  }, [transactions]);

  useEffect(() => {
    console.log(_transactions);
    return () => {};
  }, [_transactions]);

  return (
    <div>
      <h2>Transactions {_transactions.length}</h2>

      <div className="transactions__container">
        <div className="transactions__header">
          <div>ID</div>
          <div>Type</div>
          <div>Price</div>
          <div>Crypto</div>
          <div>USDT</div>
          <div>Date</div>
        </div>
      </div>
      <div className="transactions__items">
        {_transactions.map((el) => (
          <Tile key={el._id} data={el} />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
