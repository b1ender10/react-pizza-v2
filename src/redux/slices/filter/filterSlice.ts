import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export enum SortOrderType {asc = 'asc', desc = 'desc'};

type FilterState = {
  searchValue: string,
  categorySelected: number,
  sortSelected: {
    name: string,
    sortProperty: string,
  },
  sortOrder: SortOrderType,
  currentPage: number,
}

const initialState = {
  searchValue: '',
  categorySelected: 0,
  sortSelected: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  sortOrder: 'asc',
  currentPage: 1,
} as FilterState;

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    changeCategorySelected: (state, action: PayloadAction<number>) => {
      state.categorySelected = action.payload;
    },
    changeSortSelected: (state, action: PayloadAction<any>) => {
      state.sortSelected = action.payload;
    },
    changeSortOrder: (state, action: PayloadAction<SortOrderType>) => {
      state.sortOrder = action.payload;
    },
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.sortSelected = action.payload.sort;
      state.sortOrder = action.payload.sortOrder;
      state.categorySelected = Number(action.payload.categorySelected);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectorFilter = (state: RootState) => state.filter;

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
