import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Loading from "../components/Loading";


// Initiate Payment
const API_URL = import.meta.env.VITE_APP_API_URL

export const startPayment = createAsyncThunk("payment/start", async (paymentData,{rejectWithValue}) => {
  try {
    const response = await axios.post(`${API_URL}/payment/initiate`, paymentData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
    }
    });

    console.log(response.data)
    return response.data.paymentUrl;
    
  } catch (error) {
    return rejectWithValue(error.response.data) || "Failed to make payment";
    
  }

  });
  

  
  const paymentSlice = createSlice({
    name: "payment",
    initialState: { error: null,loading: false,paymentUrl: "" },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(startPayment.pending, (state) => {
          state.loading = true;
          state.error = null
        })
        .addCase(startPayment.fulfilled, (state, action) => {
          state.paymentUrl = action.payload;
          state.loading = false
          state.error = null
        })
        .addCase(startPayment.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false
        })
       
    },
  });
  

  export default paymentSlice.reducer;