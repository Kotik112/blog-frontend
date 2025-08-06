// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { describe, it, expect } from 'vitest'

vi.mock('../../utils/config.js', () => ({
    BASE_URL: 'http://localhost:8080',
}));

describe('<App />', () => {
    it('renders correctly', () => {
        render(<App />);
        expect(screen.getByText('Blogify')).toBeInTheDocument()
    })
})