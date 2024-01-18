import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/filterSlice';
import cart from './slices/cart/cartSlice';
import pizza from './slices/pizza/pizzaSlice';
import fullPizza from './slices/fullPizza/fullPizzaSlice.ts';

export default configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    fullPizza,
  },
});
