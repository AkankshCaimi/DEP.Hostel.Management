import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { AuthProvider } from './contexts/authContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <GoogleOAuthProvider clientId="787953873966-u63cbtb21qgopt9b4ekddh1vhvnbm9q7.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
