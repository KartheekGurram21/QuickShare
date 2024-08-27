import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useSignup } from '../Hooks/useSignup';
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

function Signup({ onSwitch }) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signupWithEmail, signupWithGoogle, error, isLoading } = useSignup();
    const navigate = useNavigate()

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!fname || !lname || !email || !password) 
            throw new Error('all fields must be filled')
        await signupWithEmail(fname, lname, email, password);
    };

    const handleGoogleSuccess = async (res) => {
        try {
            await signupWithGoogle(res);
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
                    <h2 className="text-center mb-4">Welcome to QuickShare</h2>

                    <Button
                        onClick={() => loginGoogle()}
                        className="w-100"
                        style={{ backgroundColor: '#ffffff', color: 'black' }}
                    >
                        Sign up with Google
                    </Button>

                    <div className="text-center my-3">or</div>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleEmailSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="First name"
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Last name"
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
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
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </Button>
                    </Form>

                    <p className="text-center mt-3">
                        Signing up means you agree to the <a href="#hello">Privacy Policy</a> and <a href="#hi">Terms of Service</a>.
                    </p>

                    <p className="text-center">
                        Have an account? <a href="#" onClick={onSwitch}>Sign in.</a>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
