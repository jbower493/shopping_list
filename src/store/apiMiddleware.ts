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

        let errorMessage = 'Something went wrong.'
        const errors = action?.payload?.data?.errors

        if (Array.isArray(errors)) errorMessage = errors[0]
        if (typeof errors === 'object') {
            const first = Object.values(errors)[0]
            if (Array.isArray(first) && typeof first[0] === 'string') errorMessage = first[0]
        }

        if (!exemptEndpoints.includes(endpointName)) toast.error(errorMessage)
    }

    return next(action)
}
