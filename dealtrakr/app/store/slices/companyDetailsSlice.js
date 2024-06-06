import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Async thunk to fetch company details by ID from the database
 */

export const fetchCompanyDetails = createAsyncThunk(
  "companyDetails/fetchCompanyDetails",
  async (id) => {
    try {
      const response = await axios.get(
        `https://dealstrakr.onrender.com/companies/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

/**
 * Initial state for the company details slice
 */
const initialState = {
  companyDetails: {},
  loading: "idle",
  error: null,
};

/**
 * Creates a company details slice
 */
const companyDetailsSlice = createSlice({
  name: "companyDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.companyDetails = action.payload;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

/**
 * Export company details slice reducer
 */
export default companyDetailsSlice.reducer;
