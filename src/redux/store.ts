import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/filterSlice';
import cart from './slices/cart/cartSlice';
import pizza from './slices/pizza/pizzaSlice';
import fullPizza from './slices/fullPizza/fullPizzaSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    fullPizza,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>