import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {order, sortBy, category, search, currentPage} = params;
        const response = await axios.get(
            `https://6363b07f8a3337d9a2e4920d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
          );
        return response.data;
    }
);

const initialState = {
    items: [],
    status: 'loading', // состояния загрузки: loading | success | error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) { // 'pizza/reducers/setItems'
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        },
    },
});

export const selectPizzaItems = (state) => state.pizza;

export const {setItems} = pizzaSlice.actions;
export default pizzaSlice.reducer;