import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editDeal = createAsyncThunk('editDeal/editDeal', async ({ dealId, dealData }) => {
  try {
    const response = await axios.put(`http://localhost:8000/deals/${dealId}`, dealData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  status: 'idle',
  error: null
}

const editDealSlice = createSlice({
  name: 'editDeal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editDeal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editDeal.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(editDeal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default editDealSlice.reducer;

