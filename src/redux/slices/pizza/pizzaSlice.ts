import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

enum StatusType {loading = 'loading', success = 'success', error = 'error'};

type PizzaItem = {
  id: string,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  category: number,
  rating: number,
}

type PizzaState = {
  items: PizzaItem[],
  status: StatusType,
} 

const initialState = {
  items: [],
  status: 'loading',
} as PizzaState;

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params : any) => {
  const { currentPage, category, sort, order } = params;

  const { data } = await axios.get(
    `https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}`,
  );
  return data;
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = StatusType.loading;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = StatusType.success;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = StatusType.error;
    });
  },
});

export const selectorPizza = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
