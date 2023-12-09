import { createSlice } from '@reduxjs/toolkit';

export const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    searchValue: '',
    categorySelected: 0,
    sortSelected: {
      name: 'популярности',
      sortProperty: 'rating',
    },
    sortOrder: 'asc',
  },
  reducers: {
    changeSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    changeCategorySelected: (state, action) => {
      state.categorySelected = action.payload;
    },
    changeSortSelected: (state, action) => {
      state.sortSelected = action.payload;
    },
    changeSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSearchValue, changeCategorySelected, changeSortSelected, changeSortOrder } =
  sortSlice.actions;

export default sortSlice.reducer;
