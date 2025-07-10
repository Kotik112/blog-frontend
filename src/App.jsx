import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider.jsx';
import BlogPostRouter from './components/BlogPostRouter.jsx';
import React from 'react'

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <BlogPostRouter />
            </AuthProvider>
        </Router>
    );
}
