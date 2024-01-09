import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params) => {
  const { currentPage, category, sort, order } = params;

  const { data } = await axios.get(
    `https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}`,
  );
  return data;
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    status: 'loading', // loading, success, error
  },
  reducers: {
    setPizzas: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = 'error';
    });
  },
});

export const selectorPizza = (state) => state.pizza;

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
