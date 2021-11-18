import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("ET-token");
console.log("TOKEN",token)

const initialState = token
  ? { isAuth: true, user:null, token: token }
  : { isAuth: false, user: null, token: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuth = false;
      state.token = null;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user;

export default userSlice.reducer;
