import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Error = ({ message }) => {
    return (
        <Container className="text-center mt-5">
            <h2>Error</h2>
            <p>{message}</p>
            <Button variant="primary" href="/upload">Upload a File</Button>
        </Container>
    );
};

export default Error;
