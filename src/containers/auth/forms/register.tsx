import React, { useState, useEffect, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from 'utils/api'

function LoginForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [register, { isLoading, isSuccess }] = useRegisterMutation()

    const navigate = useNavigate()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        register({ name, email, password })
    }

    useEffect(() => {
        if (isSuccess) navigate('/login')
    }, [isSuccess])

    if (isLoading) return <h1>Registering...</h1>

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div>
                <label htmlFor='name'>Name</label>
                <input id='name' type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input id='email' type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
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
