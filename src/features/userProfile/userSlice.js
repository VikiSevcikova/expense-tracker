import { createSlice } from "@reduxjs/toolkit";
import CurrencyLabel from "../../utils/CurrencyLabel";

const token = localStorage.getItem("ET-token");

const initialState = token
  ? {
    isAuth: true,
    user: null,
    token: token,
    currency: {
      name: "CAD",
      rate: 1,
      symbol: "$",
      preRate: 1
    }
  }
  : {
    isAuth: false,
    user: null,
    token: null,
    currency: {
      name: "CAD",
      rate: 1,
      symbol: "$",
      preRate: 1
    }
  };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("ET-token", action.payload);
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.token = localStorage.getItem("ET-token");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    removeUser: (state) => {
      localStorage.removeItem("ET-token");
      state.user = null;
      state.isAuth = false;
      state.token = null;
    },
    setRate: (state, action) => {
      const symbol = CurrencyLabel.find((currency) => {
            return currency.name === action.payload.name;
          });
      return {
        ...state,
        currency: {
          ...state.currency,
          name:action.payload.name,
          symbol: symbol.symbol,
          preRate: action.payload.preRate,
          rate: action.payload.rate,
        },
      };
    },
  },
});

export const {
  setUser,
  updateUser,
  removeUser,
  setToken,
  setCurrency,
  setRate,
} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user;

export default userSlice.reducer;
