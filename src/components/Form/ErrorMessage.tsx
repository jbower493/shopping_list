import React from 'react'
import { FieldError } from 'react-hook-form'

function ErrorMessage({ error }: { error: FieldError | undefined }) {
    return error ? <p className='-mt-3 mb-3 text-red-500'>{error.message}</p> : <></>
}

export default ErrorMessage
