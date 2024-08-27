import React from 'react';
import { Form, InputGroup, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function InputSearch() {
    return (
        <Container className="my-4">
            <InputGroup className="search-input-group">
                <Form.Control
                    type="text"
                    placeholder="Search for a file..."
                    className="search-input"
                />
                <InputGroup.Text>
                    <FaSearch />
                </InputGroup.Text>
            </InputGroup>
        </Container>
    );
}

export default InputSearch;
