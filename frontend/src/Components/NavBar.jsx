import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuthContext } from '../Hooks/useAuthContext'; 
import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/Logo.jpg';

function NavBar() {
    const { isAuthenticated, clearUser } = useAuthContext(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser(); 
        navigate('/');
    };

    const handleUpload = () => {
        navigate('/upload'); 
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href={isAuthenticated?"/dashboard":"/"}>
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{ width: '40px', height: 'auto', marginRight: '10px' }}
                    />
                    QuickShare
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/pricing">Pricing</Nav.Link>
                        {isAuthenticated ? (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link href="/signup">Signup/Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;