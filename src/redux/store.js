import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/filterSlice';
import cart from './slices/cart/cartSlice';

export default configureStore({
  reducer: {
    filter,
    cart,
  },
});
