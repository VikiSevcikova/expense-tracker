import { createSlice } from '@reduxjs/toolkit';

export const themeChangerSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: localStorage.theme === undefined ? "dark" : localStorage.getItem("theme")
  },
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem("theme", action.payload);
      return { ...state, mode: action.payload };
    }
  }
});

//export reducer, actions,and state(selector)
export default themeChangerSlice.reducer;
export const { setTheme } = themeChangerSlice.actions;
export const selectTheme = (state) => state.theme;

