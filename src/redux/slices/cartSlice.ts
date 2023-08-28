import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type tCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface iCartState {
  totalPrice: number;
  items: tCartItem[];
}

const initialState: iCartState = {
  totalPrice: 0,
  items: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<tCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, pizza) => {
        return sum + pizza.count * pizza.price;
      }, 0);
    },
    plusPizza(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce((sum, pizza) => {
        return sum + pizza.count * pizza.price;
      }, 0);
    },
    minusPizza(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = state.items.reduce((sum, pizza) => {
        return sum + pizza.count * pizza.price;
      }, 0);
    },
    removePizza(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.items.reduce((sum, pizza) => {
        return sum + pizza.count * pizza.price;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removePizza, clearCart, plusPizza, minusPizza } =
  cartSlice.actions;

export default cartSlice.reducer;
