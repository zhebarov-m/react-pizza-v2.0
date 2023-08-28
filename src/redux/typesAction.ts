// typesAction.ts
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { addItem } from "./slices/cartSlice";
import { setPizzas } from "./slices/pizzaSlice";
import { store } from "./store";

// Определяю объединенный тип для всех действий
export type AppAction =
  | ActionCreatorWithPayload<typeof addItem>
  | ActionCreatorWithPayload<typeof setPizzas>;


// Экспортирую тип для использования в компонентах
export type RootState = ReturnType<typeof store.dispatch>;
