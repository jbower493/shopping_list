import { configureStore } from '@reduxjs/toolkit';
import { authApi } from "../containers/auth/api";
import { listsApi } from "../containers/lists/api";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [listsApi.reducerPath]: listsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            listsApi.middleware,
            authApi.middleware,
        ]),
});
