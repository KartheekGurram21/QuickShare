import React, { useState } from 'react';
import { Button, Container, Form, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../Hooks/useAuth';
import { Navigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';

function Upload() {
    const { isAuthenticated } = useAuth();
    const [file, setFile] = useState(null);
    const [fileInfo, setFileInfo] = useState(null);
    const [error, setError] = useState('');

    if (!isAuthenticated) {
        return <Navigate to="/signup" />;
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileInfo({
                name: selectedFile.name,
                size: (selectedFile.size / 1024).toFixed(2) + ' KB',
                type: selectedFile.type || 'Unknown',
                lastModified: new Date(selectedFile.lastModified).toLocaleDateString(),
            });
            setError('');
        }
    };

    const handleFileUpload = () => {
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }
        
        console.log('File uploaded:', file);
    };

    return (
        <div>
            <NavBar />
            <Container className="mt-5">
                <h2>Upload Your File</h2>
                <Form>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select a file to upload</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    {fileInfo && (
                        <Card className="mt-3">
                            <Card.Body>
                                <Card.Title>File Details</Card.Title>
                                <Card.Text><strong>Name:</strong> {fileInfo.name}</Card.Text>
                                <Card.Text><strong>Size:</strong> {fileInfo.size}</Card.Text>
                                <Card.Text><strong>Type:</strong> {fileInfo.type}</Card.Text>
                                <Card.Text><strong>Last Modified:</strong> {fileInfo.lastModified}</Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    <Button variant="primary" onClick={handleFileUpload} className="mt-3">
                        Upload
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default Upload;
