// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'
import { describe, it, expect } from 'vitest'

describe('App component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<App />)
        expect(getByText('Blogify')).toBeInTheDocument()
    })
})