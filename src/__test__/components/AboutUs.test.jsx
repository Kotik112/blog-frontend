import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AboutUs from '../../components/AboutUs.jsx'

// 👇 Mock the UserCard component to isolate the test
vi.mock('../../components/UserCard', () => ({
    default: () => <div data-testid="user-card">Mocked UserCard</div>
}))

describe('<AboutUs />', () => {
    it('renders the UserCard component', () => {
        render(<AboutUs />)
        expect(screen.getByTestId('user-card')).toBeInTheDocument()
        expect(screen.getByText(/mocked usercard/i)).toBeInTheDocument()
    })
})