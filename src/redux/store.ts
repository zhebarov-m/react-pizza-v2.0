import { configureStore } from "@reduxjs/toolkit";
import filterReduce from "./slices/filterSlice";
import searchReduce from "./slices/searchSlice";
import cartReduce from "./slices/cartSlice";
import pizzaSlice from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filterReduce,
    search: searchReduce,
    cart: cartReduce,
    pizza: pizzaSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch