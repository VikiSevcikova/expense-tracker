import { createSlice } from '@reduxjs/toolkit';

const initialState = {userInfo: null, isAuth: false };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAuth = true;
    },
    removeUser: (state) => {
      state.userInfo = null;
      state.isAuth = false;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user;

export default userSlice.reducer;
