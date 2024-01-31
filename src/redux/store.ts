import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/filterSlice';
import cart from './slices/cart/cartSlice';
import pizza from './slices/pizza/pizzaSlice';
import fullPizza from './slices/fullPizza/fullPizzaSlice';

const rootReducer = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    fullPizza,
  },
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer.getState>