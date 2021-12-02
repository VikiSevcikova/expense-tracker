import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency, setRate, selectUser } from "../userProfile/userSlice";
import currencyLabel from "../../utils/CurrencyLabel";
import "./Currency.scss";

import { Convert } from "easy-currencies";

export default function Currency() {
  const dispatch = useDispatch();
  const { currency } = useSelector(selectUser);

  useEffect(() => {
    const updateRates = async () => {
      try {
        const base = await Convert().from("CAD").fetch();
        const rate = await base.amount(1).to(currency.name);
        dispatch(setRate(rate));
      } catch (err) {
        console.log(err);
      }
    };
    updateRates();
  }, [currency.name]);

  const currencyOnChange = (e) => {
    console.log(e);
    dispatch(setCurrency(e));
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
            >
              {currency.symbol}{currency.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
}
