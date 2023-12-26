import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/filterSlice';
import cart from './slices/cart/cartSlice';
import pizza from './slices/pizza/pizzaSlice';

export default configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
