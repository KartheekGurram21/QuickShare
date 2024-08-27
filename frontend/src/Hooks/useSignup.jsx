import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from 'axios';

export function useSignup() {
    const { setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const signupWithEmail = async (fname, lname, email, password) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:3001/api/user/signup', {fname, lname, email, password });
            const user = { email: res.data.email };
            setUser(user);
        } catch (err) {
            setError('Signup failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    const signupWithGoogle = async (credential) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:3001/api/user/googleSignup', { token: credential });
            const user = {fname: res.data.fname, email: res.data.email };
            setUser(user);
        } catch (err) {
            setError('Google signup failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    return { signupWithEmail, signupWithGoogle, error, isLoading };
}
