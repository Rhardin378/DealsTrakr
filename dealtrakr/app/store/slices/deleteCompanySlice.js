import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to delete a company from the database
export const deleteCompany = createAsyncThunk('deleteCompany/deleteCompany', async (id) => {
  try {
    // Make a DELETE request to the server to delete the company
    await axios.delete(`http://localhost:8000/companies/${id}`);
  } catch (error) {
    throw error;
  }
});

// Define the initial state for the deleteCompany slice
const initialState = {
  status: 'idle',
  error: null,
};

// Create the deleteCompany slice
const deleteCompanySlice = createSlice({
  name: 'deleteCompany',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCompany.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the slice and its actions
export default deleteCompanySlice.reducer;