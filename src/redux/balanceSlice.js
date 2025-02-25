import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = import.meta.env.VITE_APP_API_URL



const getUserBalance = createAsyncThunk("user/getBalance", async (_,{rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/get/user-balance`, {
            withCredentials: true,    
            headers: {
              'Content-Type': 'application/json'
          }
          });
          return response.data.data;
        
    } catch (error) {
        return rejectWithValue(error.response.data) || "Failed to get user balance";
        
    }

})

const balanceSlice = createSlice({
    name: "balance",
    initialState: { error: null,loading: false,balance: 0 },
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getUserBalance.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUserBalance.fulfilled, (state, action) => {
            state.loading = false;
            state.balance = action.payload;
            state.error = null;
          })
          .addCase(getUserBalance.rejected, (state, action) => {
            state.loading = false;
            state.balance = null;
            state.error = action.error.message
          });
      },
})  

export {getUserBalance}
export default balanceSlice.reducer