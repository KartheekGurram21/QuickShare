import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from 'axios';

export function useLogin() {
    const { setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const loginWithEmail = async (email, password) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:3001/api/user/login', { email, password });
            const user = { email: res.data.user.email };
            setUser(user);
        } catch (err) {
            setError('Signin failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = async (credential) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:3001/api/user/googleLogin', { token: credential });
            const user = {fname: res.data.fname, email: res.data.email };
            setUser(user);
        } catch (err) {
            setError('Google login failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    return { loginWithEmail, loginWithGoogle, error, isLoading };
}
