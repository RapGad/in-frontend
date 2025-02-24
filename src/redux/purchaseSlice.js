import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = import.meta.env.VITE_APP_API_URL


const purchaseInvestment = createAsyncThunk("investment/purchasingInvestment", async (data,{rejectWithValue}) => {

  try {
    const response = await axios.post(`${API_URL}/investment/purchase`, data, {
      withCredentials: true
    });

    console.log(response.data)
    return response.data.data;
    
  } catch (error) {
    return rejectWithValue(error.response.data) || "Failed to purchase";
    
  }

})


const purchaseSlice = createSlice(
    {
        name: "purchase",
        initialState: { error: null,loading: false,purchase:null },
        reducers: {},

    extraReducers: (builder) => {
        builder
          .addCase(purchaseInvestment.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(purchaseInvestment.fulfilled, (state, action) => {
            state.loading = false;
            state.purchase = action.payload;
            state.error = null;
          })
          .addCase(purchaseInvestment.rejected, (state, action) => {
            state.loading = false;
            state.purchase = null;
            state.error = action.error.message;
          });
      },}
  
)


export {purchaseInvestment}
export default purchaseSlice.reducer