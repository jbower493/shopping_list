import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../index'
import { login } from '../api'

function LoginForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { mutate, isLoading } = useMutation(login, {
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
        }
    })

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        mutate({ email, password })
    }

    if (isLoading) return <h1>Loading</h1>

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Login</h1>
                <label htmlFor='email'>Email</label>
                <input id='email' type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
            <div>
                <Link to='/register'>Register</Link>

                <Link to='/user-one'>User One</Link>
                <Link to='/user-two'>User Two</Link>
            </div>
        </form>
    )
}

export default LoginForm
