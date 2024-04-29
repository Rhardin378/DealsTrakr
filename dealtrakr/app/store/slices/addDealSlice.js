import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to add a new track to the database
export const addDeal = createAsyncThunk('addDeal/addDeal', async (dealData) => {
  try {
    // Make a POST request to the server to add a new track
    const response = await axios.post(`http://localhost:8000/deals`, dealData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define the initial state for the addDeal slice
const initialState = {
  status: 'idle',
  error: null,
};

// Create the addDeal slice
const addDealSlice = createSlice({
  name: 'addDeal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDeal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addDeal.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addDeal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the slice and its actions
export default addDealSlice.reducer;