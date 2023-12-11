import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filter/filterSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
  },
});
