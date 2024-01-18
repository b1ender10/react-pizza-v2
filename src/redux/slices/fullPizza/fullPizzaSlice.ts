import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizza: any = createAsyncThunk('fullPizza/fetchPizza', async (id : any) => {
  const { data } = await axios.get(`https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items/${id}`);
  return data;
});

export const fullPizzaSlice = createSlice({
  name: 'fullPizza',
  initialState: {
    item: [],
    status: 'loading', // loading, success, error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      state.item = [];
      state.status = 'loading';
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.item = [];
      state.status = 'error';
    });
  },
});

export default fullPizzaSlice.reducer;
