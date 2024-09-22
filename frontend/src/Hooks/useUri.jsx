import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useUri() {
    const navigate = useNavigate();

    const searchEndpoint = async (endpoint) => {
        const trimmedEndpoint = endpoint.trim();
        const encodedTerm = encodeURIComponent(trimmedEndpoint);
        
        if (trimmedEndpoint) {
            try {
                const response = await axios.get(`http://localhost:3001/api/share/${encodedTerm}`);
                const data = response.data;
                
                if (data && !data.message) {
                    navigate(`/download/${encodedTerm}`);
                } else {
                    navigate(`/upload/${encodedTerm}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally handle navigation to a generic error page or display an error message
            }
        }
    };

    return { searchEndpoint };
}
