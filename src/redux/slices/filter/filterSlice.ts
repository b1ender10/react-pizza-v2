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
    setFilters: (state, action) => {
      state.sortSelected = action.payload.sort;
      state.sortOrder = action.payload.sortOrder;
      state.categorySelected = Number(action.payload.categorySelected);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectorFilter = (state: any) => state.filter;

// Action creators are generated for each case reducer function
export const {
  changeSearchValue,
  changeCategorySelected,
  changeSortSelected,
  changeSortOrder,
  changeCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
