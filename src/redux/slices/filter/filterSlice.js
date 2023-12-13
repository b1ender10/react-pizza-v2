import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    searchValue: '',
    categorySelected: 0,
    sortSelected: {
      name: 'популярности',
      sortProperty: 'rating',
    },
    sortOrder: 'asc',
    currentPage: 1,
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
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeSearchValue,
  changeCategorySelected,
  changeSortSelected,
  changeSortOrder,
  changeCurrentPage,
} = filterSlice.actions;

export default filterSlice.reducer;
