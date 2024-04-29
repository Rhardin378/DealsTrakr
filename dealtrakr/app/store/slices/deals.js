import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const axios = require("axios");
// our asyncThunk to create an api call to our /companies endpoint
export const fetchDeals = createAsyncThunk(
  "companies/fetchDeals",
  async () => {
    let response;
    response = await axios.get("http://localhost:8000/deals");

    return response.data;
  }
);
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
