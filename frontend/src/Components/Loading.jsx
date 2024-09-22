import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const Loading = ({ message }) => {
    return (
        <Container className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p>{message}</p>
        </Container>
    );
};

export default Loading;
