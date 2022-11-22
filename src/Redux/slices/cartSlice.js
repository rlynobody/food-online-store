import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
    totalCount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id == action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload, count: 1
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => { 
                return ((obj.price*obj.count) + sum);
            }, 0);

            state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
        },
        reduceItem(state, action) {
            const findItem = state.items.find(obj => obj.id == action.payload.id);
            
            // Проверка на количество предметов, чтобы не уйти в минус
            if (findItem && findItem.count > 1) {
                findItem.count--;
            } else {
                state.items = state.items.filter(obj => obj.id !== action.payload.id);
            }

            state.totalPrice = state.items.reduce((sum, obj) => { 
                return ((obj.price*obj.count) + sum);
            }, 0);

            state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);

            if (state.count <= 0 ) {
                state.items = state.items.filter(obj => obj.id !== action.payload);
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload);

            state.totalPrice = state.items.reduce((sum, obj) => { 
                return ((obj.price*obj.count) + sum);
            }, 0);

            state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
    },
});

export const selectCart = (state) => state.cart;
// Сначала передаем id в функцию, эта функция вызовет ещё одну с параметром state
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id ==id);

export const { addItem, reduceItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;