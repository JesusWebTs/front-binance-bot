import React from "react";
import "./styles.css";
import { Header, CurrencyCard } from "../../components";
import { useCurrencys } from "../../hooks";

function Main() {
  const { currencysInfo } = useCurrencys();
  return (
    <div>
      <Header totalCurrencys={5} totalBalance={0} />
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
