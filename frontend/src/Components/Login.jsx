import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useLogin } from '../Hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

function Login({ onSwitch }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginWithEmail, loginWithGoogle, error, loading } = useLogin(); 
    const navigate = useNavigate();  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        try {
            await loginWithEmail(email, password);
            //navigate('/dashboard'); 
        } catch (error) {
            console.error('Email login error:', error);
        }
    };

    const handleGoogleSuccess = async (res) => {
        try {
            await loginWithGoogle(res);
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    const handleGoogleError = (error) => {
        console.error('Google login error:', error);
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: handleGoogleError,
        auto_select: false, 
    });

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={6} className="mx-auto">
                    <h2 className="text-center mb-4">Welcome Back to QuickShare</h2>

                    <Button
                        onClick={() => loginGoogle()}
                        className="w-100"
                        style={{ backgroundColor: '#ffffff', color: 'black' }}
                    >
                        Sign in with Google
                    </Button>

                    <div className="text-center my-3">or</div>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                            style={{ backgroundColor: '#007BFF' }}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </Button>
                    </Form>

                    <p className="text-center mt-3">
                        <a href="#forgot">Forgot your password?</a>
                    </p>

                    <p className="text-center">
                        Don't have an account? <a href="#" onClick={onSwitch}>Create one</a>.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
