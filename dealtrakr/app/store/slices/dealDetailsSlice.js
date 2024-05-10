import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Async thunk to fetch company details by ID from the database
 */

export const fetchDealDetails = createAsyncThunk(
  "dealDetails/fetchDealDetails",
  async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/deals/${id}`);
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
  dealDetails: {},
  loading: "idle",
  error: null,
  companyName: "",
};

/**
 * Creates a company details slice
 */
const dealDetailsSlice = createSlice({
  name: "dealDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDealDetails.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchDealDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.dealDetails = action.payload;
        state.companyName = action.payload.company.name;
      })
      .addCase(fetchDealDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

/**
 * Export deals details slice reducer
 */
export default dealDetailsSlice.reducer;
