import React from 'react'
import { FieldError } from 'react-hook-form'

function ErrorMessage({ error }: { error: FieldError | undefined | false }) {
    return error ? <p className='-mt-3 mb-3 text-error'>{error.message}</p> : <></>
}

export default ErrorMessage
