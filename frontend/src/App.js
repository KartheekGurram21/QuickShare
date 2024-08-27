import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from "./Pages/LandingPage";
import SignupLogin from "./Pages/SignupLogin";
import Dashboard from './Pages/Dashboard'
import Pricing from "./Pages/Pricing";
import { gapi } from 'gapi-script'

const clientId = '698069514179-bh5d7m5s30mintqf7qhp81o9jbke2sv2.apps.googleusercontent.com'; // Replace with your actual client ID

function App() {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: 'email',
            })
        }
        gapi.load('client:auth2', start);
    }, []); 

    return (
        <AuthContextProvider>
            <GoogleOAuthProvider clientId={clientId}>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/signup" element={<SignupLogin />} />
                        <Route path="/pricing" element={<Pricing />} />
                    </Routes>
                </Router>
            </GoogleOAuthProvider>
        </AuthContextProvider>
    );
}

export default App;
