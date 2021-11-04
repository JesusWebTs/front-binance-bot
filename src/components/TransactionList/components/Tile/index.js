import React from "react";
import "./styles.css";
function Tile({ data }) {
  return (
    <div
      className={`tile-container ${
        data.transactionType === "BUY"
          ? "tile-container__BUY"
          : "tile-container__SELL"
      }`}
    >
      <h4>{data.idTransaction}</h4>
      <h4>{data.transactionType}</h4>
      <h4>{data.price}</h4>
      <h4>{data.crypto}</h4>
      <h4>{data.usdt}</h4>
      <h4>{new Date(parseInt(data.date)).toLocaleString()}</h4>
    </div>
  );
}

export default Tile;
