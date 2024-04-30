import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to add a new track to the database
export const addCompany = createAsyncThunk('addCompany/addCompany', async (companyData) => {
  try {
    // Make a POST request to the server to add a new track
    const response = await axios.post(`http://localhost:8000/companies`, companyData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define the initial state for the addCompany slice
const initialState = {
  status: 'idle',
  error: null,
};

// Create the addCompany slice
const addCompanySlice = createSlice({
  name: 'addCompany',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCompany.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the slice and its actions
export default addCompanySlice.reducer;