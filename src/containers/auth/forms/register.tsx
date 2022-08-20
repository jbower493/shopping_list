import React, { useState, useEffect, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from 'utils/api/auth'
import Button from 'components/Button'
import Loader from 'components/Loader'

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

    if (isLoading) return <Loader />

    return (
        <div className='flex items-center h-full'>
            <form className='w-80 mx-auto p-3 border border-emerald-500 rounded' onSubmit={handleSubmit}>
                <h2 className='text-emerald-500 text-2xl mb-4 font-bold text-center'>Register</h2>
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
                    <Button className='w-full mb-3' type='submit'>
                        Register
                    </Button>
                </div>
                <div>
                    <Link to='/login'>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
