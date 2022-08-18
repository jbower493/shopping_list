import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

function LoginForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

    }

    // if (isLoading) return <h1>Loading</h1>

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Register</h1>
                <label htmlFor='email'>Email</label>
                <input id='email' type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button type='submit'>Register</button>
            </div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
        </form>
    )
}

export default LoginForm
