import { configureStore } from "@reduxjs/toolkit";
import filterReduce from "./slices/filterSlice";
import searchReduce from "./slices/searchSlice";
import cartReduce from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    filter: filterReduce,
    search: searchReduce,
    cart: cartReduce,
  },
});
