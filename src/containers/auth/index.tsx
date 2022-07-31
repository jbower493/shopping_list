import React, { useState } from 'react'
import LoginForm from './forms/login'
import RegisterForm from './forms/register'

enum FormMode {
    Register = 'Register',
    Login = 'Login'
}

function Auth() {
    const [formMode, setFormMode] = useState<FormMode>(FormMode.Login)

    function goToLogin() {
        setFormMode(FormMode.Login)
    }

    function goToRegister() {
        setFormMode(FormMode.Register)
    }

    return (
        <div>
            {formMode === FormMode.Register ? <RegisterForm goToLogin={goToLogin} /> : <LoginForm goToRegister={goToRegister} />}
        </div>
    )
}

export default Auth
