import React, { useState } from 'react';
import Login from '../Components/Login';
import Signup from '../Components/Signup';

function SignUpLogin() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            {isLogin ? (
                <Login onSwitch={() => setIsLogin(false)} />
            ) : (
                <Signup onSwitch={() => setIsLogin(true)} /> 
            )}
        </>
    );
}

export default SignUpLogin;
