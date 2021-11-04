import { useEffect, useState } from "react";
import { firebaseServices } from "../services";

const { RealTimeDatabase } = firebaseServices;

const useCurrencys = () => {
  const [currencysInfo, setCurrencyInfo] = useState([]);

  useEffect(() => {
    getAllCurrencysInfo();
    onUpdateCurrency();
    return () => {};
  }, []);

  const getCurrencyInfo = async ({ symbolTime }) => {
    return await RealTimeDatabase.readCollection({
      collection: `trading-history/${symbolTime}`,
    });
  };

  const getAllCurrencysInfo = async () => {
    const currencys = await RealTimeDatabase.readCollection({
      collection: `trading-history`,
    });
    let currencysArr = [];
    for (const key in currencys) {
      if (Object.hasOwnProperty.call(currencys, key)) {
        const element = currencys[key];
        currencysArr.push({
          currencyName: key,
          ...element,
        });
      }
    }

    setCurrencyInfo(currencysArr);
    return currencysArr;
  };

  const onUpdateCurrency = () => {
    RealTimeDatabase.onUpdateCollecion({
      collection: `trading-history`,
      onUpdate: (data) => {
        let currencysArr = [];
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            currencysArr.push({
              currencyName: key,
              ...element,
            });
          }
        }
        setCurrencyInfo(currencysArr);
      },
    });
  };

  const onUpdateCurrencySelected = ({ currency, onUpdate }) => {
    RealTimeDatabase.onUpdateCollecion({
      collection: `trading-history/${currency}`,
      onUpdate: (data) => {
        onUpdate(data);
      },
    });
  };

  return {
    getCurrencyInfo,
    getAllCurrencysInfo,
    currencysInfo,
    onUpdateCurrencySelected,
  };
};

export default useCurrencys;
