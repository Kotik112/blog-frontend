import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider.jsx';
import BlogPostRouter from './components/BlogPostRouter.jsx';
// eslint-disable-next-line no-unused-vars
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
