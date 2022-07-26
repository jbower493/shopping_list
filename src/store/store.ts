import { configureStore } from "@reduxjs/toolkit";
import { listsApi } from "../components/lists/api";

export const store = configureStore({
    reducer: {
        [listsApi.reducerPath]: listsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(listsApi.middleware),
});
