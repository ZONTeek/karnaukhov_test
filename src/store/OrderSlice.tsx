import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "./Store";
import { Order, OrdersStateType } from "../types/types";


const initialState: OrdersStateType = {
    value:[
        {
            id: 0,
            start:  "Москва" ,
            finish: "Казань",
            description: 'Test description',
            notes: ""
        },
        {
            id: 1,
            start: "Воронеж",
            description: 'Test description',
            finish: "Казань",
            notes: "Хрупкий груз"
        }
    ],
    addresses: [
        {
            cityId: 0,
            name: 'Москва',
            coords: { 
                lat: 55.70707220969473, lng: 37.56121434004347
            }
        },
        {
            cityId: 1,
            name: 'Воронеж',
            coords: { 
                lat: 51.67506337952372, lng: 39.19445351846961
            }
        },
        {
            cityId: 2,
            name: 'Казань',
            coords: { 
                lat: 55.790403605009544, lng: 49.11380962888973
            }
        },
        {
            cityId: 3,
            name: 'Ростов-на-Дону',
            coords: { 
                lat: 47.244144521202266, lng: 39.69597139960505
            }
        }
    ],
    currentOrder: undefined
}

export const OrderSlice = createSlice({
    name: 'OrderSlice',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
           state.value = [...state.value, action.payload];
        },
        removeOrder: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter((order) => order.id !== action.payload)
        },
        editOrder: (state, action: PayloadAction<Order>) => {
            state.value = state.value.map((order) => {
                if (order.id === action.payload.id) order = action.payload;
                return order;
            })
        },
        setCurrentOrder: (state, action: PayloadAction<Order>) => {
            const order = action.payload;
            let startAddress, finishAddress;
            state.addresses.forEach(address => {
                if (order.start === address.name) startAddress = address;
                if (order.finish === address.name) finishAddress = address;
            })
            if (startAddress && finishAddress) state.currentOrder = {order, startAddress, finishAddress}
        },
        clearCurrentOrder: (state) => {
            state.currentOrder = undefined;
        }
    }
});

export const selectOrders = (state: RootState) => state.Orders.value;
export const selectCurrentOrder = (state: RootState) => state.Orders.currentOrder;
export const selectAddresses = (state: RootState) => state.Orders.addresses;

export const OrderReducer = OrderSlice.reducer;

export const {addOrder, removeOrder, editOrder, setCurrentOrder, clearCurrentOrder} = OrderSlice.actions;

