import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to delete a deal from the database
export const deleteDeal = createAsyncThunk('deleteDeal/deleteDeal', async (id) => {
  try {
    // Make a DELETE request to the server to delete the deal
    await axios.delete(`http://localhost:8000/deals/${id}`);
  } catch (error) {
    throw error;
  }
});

// Define the initial state for the deleteDeal slice
const initialState = {
  status: 'idle',
  error: null,
};

// Create the deleteDeal slice
const deleteDealSlice = createSlice({
  name: 'deleteDeal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteDeal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteDeal.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the slice and its actions
export default deleteDealSlice.reducer;