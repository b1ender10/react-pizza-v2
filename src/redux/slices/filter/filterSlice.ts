import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export enum SortOrderOptions {asc = 'asc', desc = 'desc'};
export enum SortPropertyOptions {rating = 'rating', price = 'price', title = 'title'}

export type SortSelectedType = {
  name: string,
  sortProperty: SortPropertyOptions,
}

type FilterState = {
  searchValue: string,
  categorySelected: number,
  sortSelected: SortSelectedType,
  sortOrder: SortOrderOptions,
  currentPage: number,
}

const initialState: FilterState = {
  searchValue: '',
  categorySelected: 0,
  sortSelected: {
    name: 'популярности',
    sortProperty: SortPropertyOptions.rating,
  },
  sortOrder: SortOrderOptions.asc,
  currentPage: 1,
};

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
    changeSortSelected: (state, action: PayloadAction<SortSelectedType>) => {
      state.sortSelected = action.payload;
    },
    changeSortOrder: (state, action: PayloadAction<SortOrderOptions>) => {
      state.sortOrder = action.payload;
    },
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.sortSelected = action.payload.sortSelected;
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
