import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: "",
  variant: "dark",
  show: false
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.variant = action.payload.variant ? action.payload.variant : "dark";
      state.show = true;
    },
    hideAlert: (state) => {
      state.message = '';
      state.variant = "dark";
      state.show = false;
    }
  }
});

export const { showAlert, hideAlert } = alertSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAlert = (state) => state.alert;

export default alertSlice.reducer;
