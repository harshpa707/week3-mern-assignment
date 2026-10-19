import React from 'react'; // Import React for JSX.
import { createRoot } from 'react-dom/client'; // Import React DOM mounting function.
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import router components.
import { AuthProvider } from './context/AuthContext'; // Provide auth state to the whole app.
import ProtectedRoute from './components/ProtectedRoute'; // Import route guard.
import Login from './pages/Login'; // Import login page.
import Register from './pages/Register'; // Import registration page.
import Dashboard from './pages/Dashboard'; // Import task dashboard.
import './style.css'; // Load application styles.

function App() { // Define route configuration.
  return <AuthProvider><BrowserRouter><Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter></AuthProvider>; // BrowserRouter is required for Link/Navigate.
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>); // Mount React into index.html.
