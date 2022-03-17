import { configureStore } from "@reduxjs/toolkit";
import { OrderReducer } from "./OrderSlice";


export const store = configureStore({
    reducer: {
        Orders: OrderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;