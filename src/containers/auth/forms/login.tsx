import React, { useState, FormEvent } from 'react';
import { useLoginMutation } from '../api'
import DefaultLoader from '../../../components/Loaders/Default'

interface LoginFormProps {
    goToRegister: () => void
}

function LoginForm({ goToRegister }: LoginFormProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [login, { isLoading }] = useLoginMutation()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        login({ email, password })
    }

    if (isLoading) return <DefaultLoader message='Attempting login' />

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            <button type='button' onClick={goToRegister}>Go to register</button>
        </form>
    );
}

export default LoginForm;
