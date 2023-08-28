import { createSlice } from "@reduxjs/toolkit";

interface iSearchState {
  searchValue: string;
}

const initialState: iSearchState = {
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "seacrh",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
