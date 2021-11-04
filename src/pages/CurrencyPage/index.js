import React, { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import useCurrencys from "../../hooks/useCurrencys";
import "./styles.css";
import { TransactionList } from "../../components";

function CurrencyPage() {
  const [currency, setCurrency] = useState({});
  const [match, params] = useRoute("/currency/:name");
  const [location, setLocation] = useLocation();
  const { onUpdateCurrencySelected } = useCurrencys();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState(0);
  const [usdtAvailable, setUsdtAvailable] = useState(0);
  const [coinAvailable, setCoinAvailable] = useState(0);
  const [usdtAproximate, setUsdtAproximate] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    onUpdateCurrencySelected({ currency: params.name, onUpdate: setCurrency });
    return () => {};
  }, []);

  useEffect(() => {
    const [from, to, time] = params.name;
    setFrom(from);
    setTo(to);
    setTime(time);
    setUsdtAvailable(
      parseFloat(currency["usdt-available"]) > 1
        ? parseFloat(currency["usdt-available"]).toFixed(2)
        : currency["usdt-available"]
    );
    setCoinAvailable(
      parseFloat(currency["coin-available"]) > 1
        ? parseFloat(currency["coin-available"]).toFixed(2)
        : currency["coin-available"]
    );
    setPrice(
      parseFloat(currency.price) > 1
        ? parseFloat(currency.price).toFixed(2)
        : currency.price
    );

    if (currency["coin-available"] > 0) {
      setUsdtAproximate(
        parseFloat(coinAvailable * price) > 1
          ? parseFloat(coinAvailable * price).toFixed(2)
          : coinAvailable * price
      );
    } else {
      setUsdtAproximate(usdtAvailable);
    }
    console.log(currency);
    return () => {};
  }, [currency]);

  return (
    <div className="currency-page__container">
      <div className="currency-page__information">
        <div className="currency-page__currency">
          <button onClick={() => setLocation("/")}>Back</button>
          <div>
            <h2>{params.name}</h2>
            <h3>Price: {currency.price}</h3>
          </div>
          <div>
            <h3>Current Balance = {usdtAproximate} USDT</h3>
          </div>
        </div>
        <div className="currency-page__statistics">
          <div className="currency-page__RSI">
            <p>
              RSI: <strong>{currency.RSI ? currency.RSI.current : ""}</strong>
            </p>
            <p>
              Sell: <strong>{currency.RSI ? currency.RSI.overBuy : ""}</strong>{" "}
            </p>
            <p>
              Buy: <strong>{currency.RSI ? currency.RSI.overSell : ""}</strong>{" "}
            </p>
            <p>
              signal: <strong>{currency.RSI ? currency.RSI.signal : ""}</strong>{" "}
            </p>
          </div>
          <div>
            <p>
              EMA: <strong>{currency.EMA ? currency.EMA.current : ""}</strong>{" "}
            </p>
          </div>
          <div>
            <p>
              SMA: <strong>{currency.SMA ? currency.SMA.current : ""}</strong>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="currency-page__transactions">
        <TransactionList transactions={currency.transactions} />
      </div>
    </div>
  );
}

export default CurrencyPage;
