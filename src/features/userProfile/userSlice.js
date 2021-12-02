import { createSlice } from "@reduxjs/toolkit";
import currencyRates from "../../utils/CurrencyRates";

const token = localStorage.getItem("ET-token");

const initialState = token
  ? {
      isAuth: true,
      user: null,
      token: token,
      currency: {
        name: "CAD",
        rate: 1,
      }
    }
  : { isAuth: false, user: null, token: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.token = localStorage.getItem("ET-token");
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuth = false;
      state.token = null;
    },
    setCurrency: (state, action) => {
      return {
        ...state,
        currency: currencyRates.find((cur) => {
          return cur.name === action.payload;
        }),
      };
    },
  },
});

export const { setUser, removeUser, setToken, setCurrency } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user;

export default userSlice.reducer;
