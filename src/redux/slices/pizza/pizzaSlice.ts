import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

enum StatusType {LOADING = 'loading', SUCCESS = 'success', ERROR = 'error'};

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

const initialState: PizzaState = {
  items: [],
  status: StatusType.LOADING,
};

export type FetchPizzasArgs = {
  currentPage: number,
  category: string,
  sort: string,
  order: string
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>('pizza/fetchPizzas', async (params) => {
  const { currentPage, category, sort, order } = params;

  const { data } = await axios.get<PizzaItem[]>(
    `https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}`,
  );
  return data;
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = StatusType.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
      state.status = StatusType.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = StatusType.ERROR;
    });
  },
});

export const selectorPizza = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
