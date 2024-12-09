import { FieldError } from 'react-hook-form'

function ErrorMessage({ error }: { error: FieldError | undefined | false }) {
    return error ? <p className='text-error'>{error.message}</p> : <></>
}

export default ErrorMessage
