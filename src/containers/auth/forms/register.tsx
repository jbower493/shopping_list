import React, { useState, FormEvent } from 'react';
import { useRegisterMutation } from '../api'
import DefaultLoader from '../../../components/Loaders/Default'

interface RegisterFormProps {
    goToLogin: () => void
}

function LoginForm({ goToLogin }: RegisterFormProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [register, { isLoading }] = useRegisterMutation()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        register({ email, password })
    }

    if (isLoading) return <DefaultLoader message='Attempting register' />

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Register</h1>
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
            <button type="submit">Register</button>
            <button type='button' onClick={goToLogin}>Go to login</button>
        </form>
    );
}

export default LoginForm;
