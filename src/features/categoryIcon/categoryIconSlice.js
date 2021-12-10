import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaderConfig } from "../../utils/utils";
import { showAlert } from "../alertMessage/alertMessageSlice";

export const getAll = createAsyncThunk('categoryIcon/getAll', async (token, {dispatch, rejectWithValue}) => {
    try{
      const { data } = await axios.get("/category/all", getHeaderConfig(token));
      return data.categories;
    }catch(error){
      dispatch(
        showAlert({
          message: error.response.data.error
            ? error.response.data.error
            : "Sorry, there is an issues on the server.",
          variant: "danger",
        })
      );
      return rejectWithValue("error")
    }
})
  
const categoryIconSlice = createSlice({
  name: "categoryIcon",
  initialState: {
    categories: [],
    isLoading: false
  },
  extraReducers: {
    [getAll.pending]: (state) => {
      state.isLoading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    [getAll.rejected]: (state) => {
      state.categories = [];
      state.isLoading = false;
    }
  }
});

export const categoryIconActions = categoryIconSlice.actions;
export default categoryIconSlice.reducer;
export const selectCategoryIcon = (state) => state.categoryIcon;
