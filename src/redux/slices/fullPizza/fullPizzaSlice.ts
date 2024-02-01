import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

const initialState: FullPizzaState = {
  item: null,
  status: StatusType.loading,
};

export const fetchPizza = createAsyncThunk<FullPizzaType, string>('fullPizza/fetchPizza', async (id ) => {
  const { data } = await axios.get<FullPizzaType>(`https://6548a9a8dd8ebcd4ab23590d.mockapi.io/items/${id}`);
  return data;
});

export const fullPizzaSlice = createSlice({
  name: 'fullPizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.item = {} as FullPizzaType;
      state.status = StatusType.loading;
    });
    builder.addCase(fetchPizza.fulfilled, (state, action: PayloadAction<FullPizzaType>) => {
      state.item = action.payload;
      state.status = StatusType.success;
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.item = {} as FullPizzaType;
      state.status = StatusType.error;
    });
  },
});

export const selectorFullPizza = (state: RootState) => state.fullPizza;

export default fullPizzaSlice.reducer;

