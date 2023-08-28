import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type tSort = {
  name: string;
  sort: "rating" | "price" | "title";
};

export interface iFilterState {
  categoryId: number;
  sortType: tSort;
}

const initialState: iFilterState = {
  categoryId: 0,
  sortType: {
    name: "популярности",
    sort: "rating",
  },
};
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<tSort>) {
      state.sortType = action.payload;
    },
    setFilters(state, action: PayloadAction<iFilterState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
    },
  },
});

export const { setCategoryId, setSortType, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
