import React from 'react';
import { render, screen} from '@testing-library/react';
import { describe, it, expect, vi} from 'vitest';
import UserCard from '../../components/UserCard';

vi.mock('../../assets/kotik.jpg', () => ({
    default: 'test-image.jpg'
}))

describe('<UserCard />', () => {

    it('Renders properly', () => {
        render(<UserCard />);

        expect(screen.getByText('Arman Iqbal')).toBeInTheDocument();
        expect(screen.getByText('Software Engineer II')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /message/i })).toBeInTheDocument();

        const image = screen.getByAltText('User Image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'test-image.jpg');
    })
})
