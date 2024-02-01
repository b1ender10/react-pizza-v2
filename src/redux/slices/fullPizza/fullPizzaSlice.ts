import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

export enum StatusType {loading = 'loading', success = 'success', error = 'error'};

type FullPizzaType = {
  id: string,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  category: number,
  rating: number,
}

type FullPizzaState = {
  item: FullPizzaType,
  status: StatusType,
}

const initialState = {
  item: {},
  status: 'loading', // loading, success, error
} as FullPizzaState;

export const fetchPizza = createAsyncThunk('fullPizza/fetchPizza', async (id : string) => {
  const { data } = await axios.get(`https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items/${id}`);
  return data;
});

export const fullPizzaSlice = createSlice({
  name: 'fullPizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      state.item = {} as FullPizzaType;
      state.status = StatusType.loading;
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = StatusType.success;
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.item = {} as FullPizzaType;
      state.status = StatusType.error;
    });
  },
});

export const selectorFullPizza = (state: RootState) => state.fullPizza;

export default fullPizzaSlice.reducer;

