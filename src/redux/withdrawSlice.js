import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
 // Withdraw
 const API_URL = import.meta.env.VITE_APP_API_URL

  export const initiateWithdrawal = createAsyncThunk(
    "withdrawal/initiate",
    async (withdrawalData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_URL}/payment/withdraw`, withdrawalData,{
          withCredentials: true
        });
        return response.data.data;
        
      } catch (error) {
        return rejectWithValue(error.response.data) || "Failed to withdraw"
        
      }

    }
  );


  const withdrawalSlice = createSlice({
    name: "withdrawal",
    initialState: { error: null,loading: false,withdrawMessage: "" },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(initiateWithdrawal.pending, (state) => {
          state.loading = true;
        })
        .addCase(initiateWithdrawal.fulfilled, (state, action) => {
          state.loading = false;
          state.withdrawalUrl = action.payload;
        })
        .addCase(initiateWithdrawal.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });



  export default withdrawalSlice.reducer;