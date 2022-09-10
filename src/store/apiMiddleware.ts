import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        const exemptEndpoints = ['getUser']

        const endpointName = action?.meta?.arg?.endpointName

        if (!exemptEndpoints.includes(endpointName)) toast.error(action?.payload?.data?.errors[0] || 'Something went wrong.')
    }

    return next(action)
}
