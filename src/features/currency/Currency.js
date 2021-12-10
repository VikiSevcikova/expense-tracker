import React, { useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency, setRate, selectUser } from "../userProfile/userSlice";
import {convertRate, getBalance, transactionListSelector, allTran} from "../transactionList/transactionListSlice";
import currencyLabel from "../../utils/CurrencyLabel";
import "./Currency.scss";

import { Convert } from "easy-currencies";

export default function Currency() {
  const dispatch = useDispatch();
  const { currency } = useSelector(selectUser);
  const { allTran } = useSelector(transactionListSelector);

// console.log(currency)

  useEffect(() => {
    const updateRates = async () => {
      try {
        const base = await Convert().from("CAD").fetch();
        const rate = await base.amount(1).to(currency.name);
        dispatch(setRate({...currency,rate:rate}));
        dispatch(convertRate({rate:rate, preRate:currency.preRate}))
        // dispatch(getBalance({amount:allTran,rate:rate,preRate:currency.preRate}))
      } catch (err) {
        console.log(err);
      }
    };
    updateRates();
  }, [currency.name]);

  const currencyOnChange = (e) => {
    dispatch(setRate({...currency,name:e,preRate:currency.rate}));
  };

  return (
    <div className="currencyWrap">
      <DropdownButton id="dropdown-item-button" title={currency.name}>
        {currencyLabel.map((currency, index) => {
          return (
            <Dropdown.Item
              key={index}
              onClick={(e) => currencyOnChange(e.target.value)}
              value={currency.name}
              as="button"
            >{currency.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
}
