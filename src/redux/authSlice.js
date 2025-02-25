import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = import.meta.env.VITE_APP_API_URL
const initialState = {
  user: null,
  loading: false,
  error: null,

};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userCredentials,{rejectWithValue}) => {
    try {
      const response = await axios.post(`${API_URL}/user/auth/login`, userCredentials, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
      }
      });
      console.log(response.data)
      return response.data.data;
      
    } catch (error) {
      return rejectWithValue(error.response.data) || "Failed to get info";

      
    }
   

  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userCredentials,{rejectWithValue}) => {
    try {
      const response = await axios.post(`${API_URL}/user/auth/register`, userCredentials, {
        withCredentials: true
      });
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response.data) || "Failed to get info";
      
    }
    
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/auth/logout`, {
        withCredentials: true
      });

      console.log(response.data)
      return response.data.success;
      
    } catch (error) {
      return rejectWithValue(error.response.data) || "Failed to logout";
      
    }
    finally {return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  })}}
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })

      //register

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.message;
      })

      //logout 
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;