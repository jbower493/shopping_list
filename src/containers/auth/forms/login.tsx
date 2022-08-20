import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useLoginMutation } from 'utils/api'
import Button from 'components/Button'

function LoginForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [login, { isLoading }] = useLoginMutation()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        login({ email, password })
    }

    if (isLoading) return <h1>Logging in...</h1>

    return (
        <div className='flex items-center h-full'>
            <form className='w-80 mx-auto p-3 border border-emerald-500 rounded' onSubmit={handleSubmit}>
                <h2 className='text-emerald-500 text-2xl mb-4 font-bold text-center'>Login</h2>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <Button className='w-full mb-3' type='submit'>
                        Login
                    </Button>
                </div>
                <div>
                    <Link to='/register'>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
