import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useLoginMutation } from 'utils/api'

function LoginForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [login, { data, isLoading }] = useLoginMutation()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        login({ email, password })
    }

    if (isLoading) return <h1>Logging in...</h1>

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
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
            </div>
        </form>
    )
}

export default LoginForm
