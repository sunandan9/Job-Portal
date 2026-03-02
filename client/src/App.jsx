import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PostJob from './pages/PostJob';
import Reports from './pages/Reports';
import Applications from './pages/Applications';
import Layout from './components/Layout';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Layout><Home /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/applications" element={
                        <ProtectedRoute>
                            <Layout><Applications /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/post-job" element={
                        <ProtectedRoute allowedRoles={['employer', 'admin']}>
                            <Layout><PostJob /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/reports" element={
                        <ProtectedRoute allowedRoles={['admin', 'placement_officer']}>
                            <Layout><Reports /></Layout>
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
