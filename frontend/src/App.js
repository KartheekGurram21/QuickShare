import React, { useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "./Hooks/useAuthContext";
import LandingPage from "./Pages/LandingPage";
import SignupLogin from "./Pages/SignupLogin";
import Dashboard from './Pages/Dashboard';
import Upload from "./Pages/Upload";
import Pricing from "./Pages/Pricing";
import Download from "./Pages/Download";  
import { useUri } from "./Hooks/useUri";  
import { gapi } from 'gapi-script';

function EndpointHandler() {
    const { endpoint } = useParams();
    const { searchEndpoint } = useUri();

    useEffect(() => {
        if (endpoint) {
            searchEndpoint(endpoint);
        }
    }, [endpoint, searchEndpoint]);

    return null;
}

function App() {
    const { user } = useAuthContext();

    useEffect(() => {
        function start() {
            gapi.client.init({
                scope: 'email',
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    return (
        <div className='min-h-[100vh]'>
            <Routes>
                <Route 
                    path="/" 
                    element={user ? <Navigate to="/dashboard" /> : <LandingPage />} 
                />
                <Route 
                    path="/upload/:endpoint" 
                    element={<Upload />} 
                />
                <Route 
                    path="/dashboard" 
                    element={user ? <Dashboard /> : <Navigate to="/signup" />} 
                />
                <Route 
                    path="/signup" 
                    element={!user ? <SignupLogin /> : <Navigate to="/dashboard" />} 
                />
                <Route 
                    path="/pricing" 
                    element={<Pricing />} 
                />
                <Route 
                    path="/download/:endpoint" 
                    element={<Download />} 
                />
                <Route 
                    path="/:endpoint"
                    element={<EndpointHandler />}
                />
            </Routes>
        </div>
    );
}

export default App;
