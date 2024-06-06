import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const axios = require("axios");
// our asyncThunk to create an api call to our /companies endpoint
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    let response;
    response = await axios.get("https://dealstrakr.onrender.com/companies");

    return response.data;
  }
);
export const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    companiesToShow: [],
    companiesCount: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.companiesToShow = action.payload;
        // state.count = action.payload.count;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default companiesSlice.reducer;
