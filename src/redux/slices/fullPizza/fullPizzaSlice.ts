import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

enum StatusType {loading = 'loading', success = 'success', error = 'error'};

type FullPizzaState = {
  item: any[],
  status: StatusType,
}

const initialState = {
  item: [],
  status: 'loading', // loading, success, error
} as FullPizzaState;

export const fetchPizza: any = createAsyncThunk('fullPizza/fetchPizza', async (id : string) => {
  const { data } = await axios.get(`https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items/${id}`);
  return data;
});


export const fullPizzaSlice = createSlice({
  name: 'fullPizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      state.item = [];
      state.status = StatusType.loading;
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = StatusType.success;
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.item = [];
      state.status = StatusType.error;
    });
  },
});

export default fullPizzaSlice.reducer;
