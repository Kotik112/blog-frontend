import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider.jsx';
import BlogPostRouter from './components/BlogPostRouter.jsx';
import React from 'react'

export default function App() {
    return (
        <div style={{ backgroundColor: '#dbe9ee', minHeight: '100vh' }}>
            <BrowserRouter>
                <AuthProvider>
                    <BlogPostRouter />
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}
