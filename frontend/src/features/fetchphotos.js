import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  response:[],
  loading: false,
  error: null,
};

export const fetchPhotosAsync = createAsyncThunk("fetchPhotos/fetchPhotosAsync", async (query) => {
  const apiKey = 'e56sDQumyOkd4U8AKfSCf6gS63tVqj3yqrExaGqr2QRLJXqf1kJ2XDJm';

  try {
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: {
          Authorization: apiKey,
        },
      });
      return response.data
  } catch (error) {
    throw new Error(error.message); 
  }
});

const fetchPhotosSlice = createSlice({
  name: "fetchPhotos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotosAsync.fulfilled, (state,action) => {
        state.loading = false;
        state.response = action.payload;
        state.error = null;
      })
      .addCase(fetchPhotosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchPhotosSlice.reducer;
