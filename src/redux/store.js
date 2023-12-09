import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counter/counterSlice';
import sortSlice from './sort/sortSlice';

export default configureStore({
  reducer: {
    counter: counterSlice,
    sort: sortSlice,
  },
});
