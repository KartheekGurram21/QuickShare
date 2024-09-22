import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDownload } from '../Hooks/useDownload'; // Import custom hook
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import DownloadButton from '../Components/DownloadButton';

const Download = () => {
    const { endpoint } = useParams(); // Get endpoint from URL params
    const { fileDetails, downloading, loading, error, handleDownload } = useDownload(endpoint); // Use the custom hook

    if (loading) return <Loading message="Fetching file details..." />; // Loading state
    if (error) return <Error message={error} />; // Error state

    return (
        <Container className="d-flex justify-content-center mt-5">
            <DownloadButton
                fileDetails={fileDetails}
                downloading={downloading}
                handleDownload={handleDownload}
            />
        </Container>
    );
};

export default Download;
