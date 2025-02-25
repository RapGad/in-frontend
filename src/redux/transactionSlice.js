import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = import.meta.env.VITE_APP_API_URL

const getTransactions = createAsyncThunk("transaction/getTransactions", async (_,{rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/get/transactions`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.data.success === true) {
            return response.data.data;
        
        }
        else {
            return rejectWithValue(response.data) || "Failed to get info";
        }
        
    } catch (error) {
        return rejectWithValue(error.response.data) || "Failed to get info";
        
    }
})


const transactionSlice = createSlice({
    name: "transaction",
    initialState: { error: null,loading: false,transactions: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export { getTransactions };
export default transactionSlice.reducer;