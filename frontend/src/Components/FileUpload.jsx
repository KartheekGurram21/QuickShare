import React, { useEffect } from 'react';
import { Form, Card, Alert, Button } from 'react-bootstrap';
import { useUpload } from '../Context/UploadContext';
import { useParams } from 'react-router-dom';  // Import useParams to get the dynamic URL part

function FileUpload() {
    const {
        fileInfo,
        expiryDate,
        error,
        successMessage,
        setEndpoint,
        setExpiryDate,
        handleFileChange,
        handleFileUpload,
    } = useUpload();

    const { endpoint } = useParams();  // Extract the dynamic part of the URL (e.g., "hello")
    
    useEffect(() => {
        if (endpoint) {
            setEndpoint(endpoint);  // Automatically set the title as the dynamic part from URL
        }
    }, [endpoint, setEndpoint]);

    return (
        <Form>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select a file to upload</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="formEndpoint" className="mb-3">
                <Form.Label>Title (Auto-filled)</Form.Label>
                <Form.Control 
                    type="text" 
                    value={endpoint || ''}  // Use the dynamic part of the URL as the title
                    readOnly   // Make it read-only so the user cannot edit it
                />
            </Form.Group>
            <Form.Group controlId="formExpiryDate" className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control 
                    type="date" 
                    value={expiryDate} 
                    onChange={(e) => setExpiryDate(e.target.value)} 
                />
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
            {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
            <Button variant="primary" onClick={handleFileUpload} className="mt-3">
                Upload
            </Button>
        </Form>
    );
}

export default FileUpload;

