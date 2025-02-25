import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

// Send OTP
export const sendOtp = createAsyncThunk("auth/sendOtp", async (phone, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/user/auth/send-otp`, { phone });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Verify OTP
export const verifyOtp = createAsyncThunk("auth/verifyOtp", async ({ phone, otp }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/user/auth/verify-otp`, { phone, otp });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Reset Password
export const resetPassword = createAsyncThunk("auth/resetPassword", async ({ token, newPassword }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}//user/auth/reset-password`, { token, newPassword });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const passwordResetSlice = createSlice({
    name: "passwordReset",
    initialState: { loading: false, message: null, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendOtp.pending, (state) => { state.loading = true; })
            .addCase(sendOtp.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.message = payload.message;
            })
            .addCase(sendOtp.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(verifyOtp.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.message = payload.message;
            })
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.message = payload.message;
            });
    },
});

export default passwordResetSlice.reducer;
