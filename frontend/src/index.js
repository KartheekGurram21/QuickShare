import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { AuthContextProvider } from './Context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UploadProvider } from './Context/UploadContext';  // Import the UploadProvider

const clientId = '698069514179-bh5d7m5s30mintqf7qhp81o9jbke2sv2.apps.googleusercontent.com'; // Replace with your actual client ID

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthContextProvider>
        <Router>
          <UploadProvider>  {/* Wrap your app with UploadProvider inside Router */}
            <App />
          </UploadProvider>
        </Router>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
