// src/hooks/useDownload.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { downloadBlob } from '../utils/blob';

export const useDownload = (endpoint) => {
    const [fileDetails, setFileDetails] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFileDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/share/meta/${endpoint}`);
                setFileDetails(response.data);
            } catch (err) {
                setError('Failed to fetch file details.');
            } finally {
                setLoading(false);
            }
        };

        fetchFileDetails();
    }, [endpoint]);

    const handleDownload = async () => {
        setDownloading(true);
    
        try {
            const response = await axios.get(`http://localhost:3001/api/share/download/${endpoint}`, {
                responseType: 'blob',  // This ensures you're receiving binary data
            });
    
            const blob = response.data;
    
            // Pass the correct MIME type and file name to downloadBlob
            downloadBlob(blob, fileDetails?.title, fileDetails?.fileType);  // fileType should be accurate
    
        } catch (error) {
            setError('Error downloading file.');
            console.error('Error downloading file:', error);
        } finally {
            setDownloading(false);
        }
    };
    

    return { fileDetails, downloading, loading, error, handleDownload };
};
