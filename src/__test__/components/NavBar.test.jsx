//vi.mock("../assets/blog-logo.svg", () => ({ default: "logo.svg" }), { virtual: true });

const mockUseAuth = vi.fn();
vi.mock('../../components/auth/useAuth.jsx', () => ({
    useAuth: () => mockUseAuth(),
}));

import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {renderWithRouter} from "../testingUtils/util.jsx";
import NavBar from "../../components/NavBar.jsx";
import userEvent from "@testing-library/user-event";

describe("<NavBar />", () => {
    beforeEach(() => {
        mockUseAuth.mockReset();
        mockUseAuth.mockReturnValue({user: null}); // default logged out
    })

    it("renders brand and base nav items for guests; shows login and hides logout/admin", async () => {
        renderWithRouter(<NavBar />);

        // brand
        expect(screen.getByRole("link", { name: /blogify/i })).toBeInTheDocument();
        // base items
        expect(screen.getByRole("link", { name: /^home$/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /new post/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /your posts/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /about us/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
        // auth items
        expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /logout/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /admin/i })).not.toBeInTheDocument();
    });

    it("shows Logout (and hides Login) when a user is present without ADMIN role", async () => {
        mockUseAuth.mockReturnValue({user: {id: 1, roles: ["ROLE_USER"]} });
        renderWithRouter(<NavBar />);

        const user = userEvent.setup();
        // open the burger menu
        await user.click(screen.getByRole("button", { name: /open main menu/i }));

        expect(screen.getByRole("link", { name: /logout/i })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /login/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /admin/i })).not.toBeInTheDocument();
    });

    it("renders Admin link when user has ADMIN role", async () => {
        mockUseAuth.mockReturnValue({ user: { id: 1, roles: ["ROLE_USER", "ROLE_ADMIN"] } });
        renderWithRouter(<NavBar />);

        const user = userEvent.setup();
        // open the burger menu
        const burgerMenu = screen.getByRole("button", { name: /open main menu/i });
        await user.click(burgerMenu);
        expect(screen.getByRole("link", { name: /admin/i })).toBeInTheDocument();
    });
});