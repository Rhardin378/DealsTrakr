import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editCompany = createAsyncThunk('editCompany/editCompany', async ({ companyId, companyData }) => {
  try {
    const response = await axios.put(`http://localhost:8000/companies/${companyId}`, companyData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  status: 'idle',
  error: null
}

const editCompanySlice = createSlice({
  name: 'editCompany',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editCompany.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(editCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default editCompanySlice.reducer;

