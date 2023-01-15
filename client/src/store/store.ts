import { configureStore } from "@reduxjs/toolkit";
import { itemsReducer } from "./Slices/ItemSlice";
import { itemApi } from "../api/apiSlice";
const store = configureStore({
    reducer:{
        [itemApi.reducerPath]: itemApi.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(itemApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;