import { configureStore } from '@reduxjs/toolkit'
import { appApi } from 'utils/api'
import { rtkQueryErrorLogger } from 'store/apiMiddleware'

export const store = configureStore({
    reducer: {
        [appApi.reducerPath]: appApi.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware, rtkQueryErrorLogger)
})
