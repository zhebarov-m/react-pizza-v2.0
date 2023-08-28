import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type tFetchPizzaArgs = Record<string, string>;

interface iFetchPizza {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: tFetchPizzaArgs) => {
    const { sort, category, search } = params;

    const { data } = await axios.get<iFetchPizza[]>(
      `https://64ab85860c6d844abedf760e.mockapi.io/pizzaData?${sort}${category}${search}`
    );
    return data;
  }
);

// export type tPizza = {
//   id: string;
//   title: string;
//   price: number;
//   imageUrl: string;
//   sizes: number[];
//   types: number[];
//   rating: number;
// };

enum Status {
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

interface iPizzaState {
  pizzas: iFetchPizza[];
  status: Status;
}

const initialState: iPizzaState = {
  pizzas: [],
  status: Status.PENDING,
};
export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<iFetchPizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.PENDING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "pending";
  //     state.pizzas = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.pizzas = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.pizzas = action.payload;
  //     state.status = "error";
  //     state.pizzas = [];
  //   },
  // },
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
