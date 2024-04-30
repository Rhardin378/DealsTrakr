import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Async thunk to fetch all deals from the database
 */
export const fetchDeals = createAsyncThunk('deals/fetchDeals', async () => {
  try {
    // Makes a GET request to the server
    const response = await axios.get(`http://localhost:8000/deals`, {
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const dealsSlice = createSlice({
  name: "deals",
  initialState: {
    dealsToShow: [],
    dealsCount: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealsToShow = action.payload;
        // state.count = action.payload.count;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default dealsSlice.reducer;
