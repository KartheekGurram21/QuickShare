import React, { useState } from 'react';
import { Form, InputGroup, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function InputSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === '') {
            return; // Prevent navigation if searchTerm is empty
        }
        navigate(`/${encodeURIComponent(searchTerm.trim())}`); // Pass searchTerm as query parameter
    };

    return (
        <Container className="my-4">
            <Form onSubmit={handleSearch}>
                <InputGroup className="search-input-group">
                    <Form.Control
                        type="text"
                        placeholder="Search for a file..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    />
                    <InputGroup.Text onClick={handleSearch} style={{ cursor: 'pointer' }}>
                        <FaSearch />
                    </InputGroup.Text>
                </InputGroup>
            </Form>
        </Container>
    );
}

export default InputSearch;
