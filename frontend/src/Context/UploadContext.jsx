import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const UploadContext = createContext();

export const UploadProvider = ({ children }) => { 
    const { isAuthenticated, getUser } = useAuthContext();
    const [file, setFile] = useState(null);
    const [fileInfo, setFileInfo] = useState(null);
    const [endpoint, setEndpoint] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); 

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileInfo({ size: selectedFile.size, type: selectedFile.type });
        }
    };

    const handleFileUpload = async () => {
        if (!file || !endpoint) {
            setError('File and endpoint are required');
            return;
        }
        setError('');
        setSuccessMessage('');
    
        try {
            const exists = await axios.get(`http://localhost:3001/api/share/${encodeURIComponent(endpoint)}`);
            if (exists.data && !exists.data.message) {
                alert('The title has already been taken');
                navigate(`/download/${encodeURIComponent(endpoint)}`);
                return;
            }
    
            const email = isAuthenticated ? getUser().email : null;
    
            const formData = new FormData();
            formData.append('file', file); // Include filename if necessary
            formData.append('title', endpoint);
            formData.append('expiryDate', expiryDate);
            formData.append('size', file.size);
            formData.append('fileType', fileInfo.type);
            formData.append('email', email);
    
            await axios.post('http://localhost:3001/api/share/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            setSuccessMessage('File uploaded successfully');
            navigate(`/download/${encodeURIComponent(endpoint)}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Error uploading file');
            console.error('Upload error:', err);
        }
    };
    

    return (
        <UploadContext.Provider value={{
            file, fileInfo, endpoint, expiryDate, error, successMessage, 
            setFile, setFileInfo, setEndpoint, setExpiryDate, 
            handleFileChange, handleFileUpload
        }}>
            {children}
        </UploadContext.Provider>
    );
};

export const useUpload = () => useContext(UploadContext);
