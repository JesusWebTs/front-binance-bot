import React from "react";
import "./styles.css";

function Header({ totalCurrencys=0, totalBalance=0 }) {
  return (
    <div className="header__container">
      <h3 className="header__item">Currencys: {totalCurrencys}</h3>
      <h3 className="header__item">Total Balance: {totalBalance} usdt</h3>
    </div>
  );
}

export default Header;
