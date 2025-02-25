import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = import.meta.env.VITE_APP_API_URL



const getInvestmentPlans = createAsyncThunk("investment/getInvestmentplans", async (_,{rejectWithValue}) => {
  try {
    const response = await axios.get(`${API_URL}/investment/get/investment-plans`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
    }
    });
    return response.data.data;
    
  } catch (error) {
    return rejectWithValue(error.response.data) || "Failed to get info";
    
  }

})



const investmentSlice = createSlice({
    name: "investment",
    initialState: { error: null,loading: false,investmentPlans: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getInvestmentPlans.pending, (state) => {
            state.loading = true;
          })
          .addCase(getInvestmentPlans.fulfilled, (state, action) => {
            state.loading = false;
            state.investmentPlans = action.payload;
          })
          .addCase(getInvestmentPlans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
})




export { getInvestmentPlans }
export default investmentSlice.reducer
