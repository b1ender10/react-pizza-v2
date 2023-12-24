import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    sumPrice: 0,
    sumCount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const index = state.items.findIndex((el) => el.id === action.payload.id);

      if (index !== -1) {
        state.items[index].count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.sumCount = state.items.reduce((prev, cur) => (prev += cur.count), 0);
      state.sumPrice = state.items.reduce((prev, cur) => (prev += cur.count * cur.price), 0);
    },
    minusItem: (state, action) => {
      const index = state.items.findIndex((el) => el.id === action.payload);

      if (index !== -1) {
        state.items[index].count--;

        if (state.items[index].count <= 0) {
          state.items = [...state.items.slice(0, index), ...state.items.slice(index + 1)];
        }
      }

      state.sumCount = state.items.reduce((prev, cur) => (prev += cur.count), 0);
      state.sumPrice = state.items.reduce((prev, cur) => (prev += cur.count * cur.price), 0);
    },

    removeItem: (state, action) => {
      const index = state.items.findIndex((el) => el.id === action.payload);

      console.log(index, state);

      state.items = [...state.items.slice(0, index), ...state.items.slice(index + 1)];

      state.sumCount = state.items.reduce((prev, cur) => (prev += cur.count), 0);
      state.sumPrice = state.items.reduce((prev, cur) => (prev += cur.count * cur.price), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.sumPrice = 0;
      state.sumCount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
