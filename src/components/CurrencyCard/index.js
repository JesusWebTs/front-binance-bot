import React, { useState, useEffect } from "react";
import "./styles.css";

function CurrencyCard({ currencyInfo }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState(0);
  const [usdtAvailable, setUsdtAvailable] = useState(0);
  const [coinAvailable, setCoinAvailable] = useState(0);
  const [usdtAproximate, setUsdtAproximate] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const [from, to, time] = currencyInfo.currencyName.split("_");
    console.log(currencyInfo);
    setFrom(from);
    setTo(to);
    setTime(time);
    setUsdtAvailable(
      parseFloat(currencyInfo["usdt-available"]) > 1
        ? parseFloat(currencyInfo["usdt-available"]).toFixed(2)
        : currencyInfo["usdt-available"]
    );
    setCoinAvailable(
      parseFloat(currencyInfo["coin-available"]) > 1
        ? parseFloat(currencyInfo["coin-available"]).toFixed(2)
        : currencyInfo["coin-available"]
    );
    setPrice(
      parseFloat(currencyInfo.price) > 1
        ? parseFloat(currencyInfo.price).toFixed(2)
        : currencyInfo.price
    );

    if (currencyInfo["coin-available"] > 0) {
      setUsdtAproximate(
        parseFloat(coinAvailable * price) > 1
          ? parseFloat(coinAvailable * price).toFixed(2)
          : coinAvailable * price
      );
    } else {
      setUsdtAproximate(usdtAvailable);
    }

    return () => {};
  }, [currencyInfo]);
  return (
    <div
      className={`currency-card__container ${
        currencyInfo.RSI.signal === "SELL"
          ? "currency-card__container--sell"
          : currencyInfo.RSI.signal < "BUY"
          ? "currency-card__container--buy"
          : ""
      } `}
    >
      <div className="currency-card__header">
        <h2>
          {from} {to}
        </h2>

        <h3>{time}</h3>
      </div>
      <h4 className="currency-card__price">
        Current price: {price} <span className="currency-card__unit">{to}</span>
      </h4>
      <div className="currency-card__data">
        <div className="currency-card__information">
          <h4>
            Current Balance ≈ {usdtAproximate}{" "}
            <span className="currency-card__unit">{to}</span>
          </h4>
          <div className="currency-card__current">
            <p>
              {usdtAvailable} <span className="currency-card__unit">{to}</span>{" "}
            </p>

            <p>
              {coinAvailable}{" "}
              <span className="currency-card__unit">{from}</span>
            </p>
          </div>
        </div>
        <div className="currency-card__estadistics">
          <h4>Statistics</h4>
          <div className="currency-card__rsi">
            <p>
              RSI: <strong>{currencyInfo.RSI.current}</strong>
            </p>
            <p>
              Sell: <strong>{currencyInfo.RSI.overBuy}</strong>{" "}
            </p>
            <p>
              Buy: <strong>{currencyInfo.RSI.overSell}</strong>{" "}
            </p>
            <p>
              signal: <strong>{currencyInfo.RSI.signal}</strong>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyCard;
