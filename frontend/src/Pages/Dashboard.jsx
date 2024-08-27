import React from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Dashboard() {
    
    const { getUser } = useAuthContext()
    const user = getUser()

    if(!user) {
        return <Navigate to="/signup" />
    }

    return (
        <div>
            <NavBar />
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title as="h1" className="text-center mb-4">
                                    Welcome, {}!
                                </Card.Title>
                                <Card.Text className="text-center">
                                    This is your personalized dashboard. You can manage your uploads, check pricing, and more!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;
