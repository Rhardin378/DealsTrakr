import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Async thunk to fetch all deals from the database
 */
export const fetchDeals = createAsyncThunk("deals/fetchDeals", async () => {
  try {
    // Makes a GET request to the server
    const response = await axios.get(`http://localhost:8000/deals`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const editDeal = createAsyncThunk(
  "editDeal/editDeal",
  async ({ dealId, dealData }) => {
    try {
      console.log(dealId);
      console.log(dealData);
      const response = await axios.put(
        `http://localhost:8000/deals/${dealId}`,
        dealData
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

export const dealsSlice = createSlice({
  name: "deals",
  initialState: {
    dealsToShow: [],
    averageDealAmount: 0,
    dealsCount: 0,
    averageTimeToClose: 0,
    currentTab: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setTab: (state, action) => {
      state.currentTab = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealsToShow = action.payload.deals;
        state.averageDealAmount = action.payload.averageDealAmount;
        state.averageTimeToClose = action.payload.averageTimeToClose;
        state.closedWonPercentage = action.payload.closedWonPercentage
        state.closedLostPercentage = action.payload.closedLostPercentage
        state.averageDealsByDate = action.payload.averageDealsByDate
        state.totalEarnings = action.payload.totalEarnings
        state.dealsByDate = action.payload.dealsByDate


      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editDeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editDeal.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(editDeal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setTab } = dealsSlice.actions
export default dealsSlice.reducer;
