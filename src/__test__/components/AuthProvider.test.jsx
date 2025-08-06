import { render, screen } from '@testing-library/react';
import React from 'react';
import {AuthProviderInternal} from "../../components/auth/AuthProviderInternal.jsx";

describe('<AuthProvider />', () => {
    it('renders basic children', () => {
        render(
            <AuthProviderInternal navigate={() => {}}>
                <div>Test Child</div>
            </AuthProviderInternal>
        );

        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
});