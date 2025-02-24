import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = import.meta.env.VITE_APP_API_URL




const getDetails = createAsyncThunk("user/getDetails", async (_,{rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/get/user-details`, {
            withCredentials: true
          });
          return response.data.data;
        
    } catch (error) {
        return rejectWithValue(error.response.data) || "Failed to get user info";
        
    }

})

const userSlice = createSlice({
    name: "userDetails",
    initialState: { error: null,loading: false,userDetails: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            }) 
            .addCase(getDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
                state.error = null;
            })
            .addCase(getDetails.rejected, (state, action) => {
                state.loading = false;
                state.userDetails = null;
                state.error = action.error.message;
            })

        
        }
});

export {getDetails}
export default userSlice.reducer