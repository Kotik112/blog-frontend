import '@testing-library/jest-dom'

Object.defineProperty(import.meta, 'env', {
    value: {
        VITE_BACKEND_URL: 'http://localhost:8080'
    },
    writable: true
});