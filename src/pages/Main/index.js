import React, { useEffect, useState } from "react";
import "./styles.css";
import { Header, CurrencyCard } from "../../components";
import { useCurrencys } from "../../hooks";

function Main() {
  const { currencysInfo } = useCurrencys();
  const [totalBalance, setTotalBalance] = useState(0);
  useEffect(() => {
    let totalBalance = 0;
    currencysInfo.forEach((currency) => {
      totalBalance += currency["usdt-available"];
      totalBalance += currency["coin-available"] * currency.price;
    });
    setTotalBalance(totalBalance);
    return () => {};
  }, []);
  return (
    <div>
      <Header
        totalCurrencys={currencysInfo.length}
        totalBalance={totalBalance.toFixed(2)}
      />
      <div className="currencys__container">
        {currencysInfo.map((currencyInfo) => (
          <CurrencyCard
            key={currencysInfo.currencyName}
            currencyInfo={currencyInfo}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
