import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type CartItem = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  size: number,
  type: string,
  count: number,
}

type CartState = {
  items: CartItem[],
  sumPrice: number,
  sumCount: number,
}

const initialState = {
  items: [],
  sumPrice: 0,
  sumCount: 0,
} as CartState;

function updateSum(state: CartState) {
  state.sumCount = state.items.reduce((prev: number, cur: CartItem) => (prev += cur.count), 0);
  state.sumPrice = state.items.reduce((prev: number, cur: CartItem) => (prev += cur.count * cur.price), 0);
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
      const index = state.items.findIndex((el) => el.id === action.payload.id);

      if (index !== -1) {
        state.items[index].count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      updateSum(state);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((el) => el.id === action.payload);

      if (index !== -1) {
        state.items[index].count--;
        if (state.items[index].count <= 0) {
          state.items = [...state.items.slice(0, index), ...state.items.slice(index + 1)];
        }
      }

      updateSum(state);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((el) => el.id === action.payload);
      state.items = [...state.items.slice(0, index), ...state.items.slice(index + 1)];
      updateSum(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.sumPrice = 0;
      state.sumCount = 0;
    },
  },
});

export const selectorCart = (state: RootState) => state.cart;
export const selectorCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItem) => obj.id === id);

// Action creators are generated for each case reducer function
export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
