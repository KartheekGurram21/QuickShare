import React from 'react';
import { Button, Card } from 'react-bootstrap';

const DownloadButton = ({ fileDetails, downloading, handleDownload }) => {
    return (
        <Card className="download-card shadow-lg p-4 bg-light rounded">
            <Card.Body className="text-center">
                <h3 className="text-center mb-4 text-primary">Download Your File</h3>

                {/* Display file details */}
                {fileDetails && (
                    <div className="mb-4 text-muted">
                        <p><strong>File:</strong> {fileDetails.title || 'Unknown File'}</p>
                        <p><strong>Size:</strong> {(fileDetails.size / (1024 * 1024)).toFixed(2)} MB</p>
                        <p><strong>Type:</strong> {fileDetails.fileType || 'Unknown'}</p>
                    </div>
                )}

                {/* Download Button */}
                <Button
                    variant="success"
                    onClick={handleDownload}
                    className="px-5 py-2 download-btn"
                    size="lg"
                    disabled={downloading} // Disable button during download
                >
                    {downloading ? 'Downloading...' : 'Download'}
                </Button>

                {/* Instructions */}
                <p className="mt-3 text-secondary small">
                    Your download will start automatically. If not, click the button above.
                </p>
            </Card.Body>
        </Card>
    );
};

export default DownloadButton;
