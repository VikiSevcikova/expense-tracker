import React, { useEffect } from "react";
import {Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency, selectUser } from "../userProfile/userSlice";
import currencyRates from "../../utils/CurrencyRates";
import "./Currency.scss";

export default function Currency() {
  const dispatch = useDispatch();
  const { currency } = useSelector(selectUser);

  useEffect(() => {
    console.log(currency);
  }, [currency]);

  const currencyOnChange = (e) => {
    console.log(e);
    dispatch(setCurrency(e));
  };

  return (
    <div className="currencyWrap">
      <DropdownButton id="dropdown-item-button"title={currency.name}>
        {currencyRates.map((currency, index) => {
          return (
            <>
              <Dropdown.Item
                onClick={(e) => currencyOnChange(e.target.value)}
                value={currency.name}
                as="button"
                key={index}
              >
                {currency.name}
              </Dropdown.Item>
            </>
          );
        })}
      </DropdownButton>
    </div>
  );
}
