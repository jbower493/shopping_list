import React, { useState, FormEvent } from 'react';
import { useLoginMutation } from '../api'

function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [login] = useLoginMutation()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        login({ email, password })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
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
        </form>
    );
}

export default LoginForm;
