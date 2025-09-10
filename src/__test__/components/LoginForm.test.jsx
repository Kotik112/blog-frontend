import React from "react";
import { screen, waitFor} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import LoginForm from "../../components/LoginForm.jsx";
import {renderWithRouter} from "../testingUtils/util.jsx";
import userEvent from "@testing-library/user-event";

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../components/auth/useAuth.jsx', () => ({
    useAuth: () => ({ user: null, login: mockLogin }),
}));
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return { ...actual, useNavigate: () => mockNavigate };
});

describe('<LoginForm />', () => {


    it("Component renders properly", async () => {
        renderWithRouter(<LoginForm />);
        const fetchMock = vi.spyOn(global, 'fetch')
            .mockReturnValue({
                ok: true,
                json: async () => ({}),
                text: async () => "",
            })

        const user = userEvent.setup()
        await fillAndSubmitForm(user);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(/\/api\/v1\/auth\/login$/i),
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify({
                    username: "testUser",
                    password: "testPwd1",
                }),
            })
        );
    });

    it("Logs in with valid credentials", async () => {
       renderWithRouter(<LoginForm />);
       const fetchMock = vi.spyOn(global, "fetch")
           .mockResolvedValue({
               ok: true,
               json: async () => ({ id: 1, username: "testUser"}),
               text: async () => "",
           });

       const user = userEvent.setup();
       await fillAndSubmitForm(user);

       expect(fetchMock).toHaveBeenCalledTimes(1);
       expect(fetchMock).toHaveBeenCalledWith(
           expect.stringMatching(/\/api\/v1\/auth\/login$/i),
           expect.objectContaining({
               method: "POST",
               body: JSON.stringify({
                   username: "testUser",
                   password: "testPwd1",
               }),
           }),
       )
    });

    it("Fails login when invalid credentials", async () => {
        renderWithRouter(<LoginForm />);
        const fetchMock = vi.spyOn(global, "fetch")
            .mockResolvedValue({
                ok: false,
                status: 401,

            });

        const user = userEvent.setup();
        await fillAndSubmitForm(user);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(/\/api\/v1\/auth\/login$/i),
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify({
                    username: "testUser",
                    password: "testPwd1",
                }),
            }),
        );
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });

    it("shows generic error for unexpected status", async () => {
        renderWithRouter(<LoginForm />);
        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: false,
            status: 500,
            text: async () => "boom",
        });

        const user = userEvent.setup();
        await fillAndSubmitForm(user);

        expect(await screen.findByText(/unexpected error occurred/i)).toBeInTheDocument();
    });

    it("Shows error when fetch fails", async () => {
        renderWithRouter(<LoginForm />);
        const fetchMock = vi.spyOn(global, "fetch")
            .mockRejectedValue(new Error("offline"));

        const user = userEvent.setup();
        await fillAndSubmitForm(user);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(screen.getByText(/network or server error/i)).toBeInTheDocument();
    })

    it("sends JSON headers and includes credentials", async () => {
        renderWithRouter(<LoginForm />);
        const fetchMock = vi.spyOn(global, "fetch")
            .mockResolvedValue({
                ok: true,
                json: async () => ({ id: 1, username: "testUser"}),
                text: async () => "",
            });

        const user = userEvent.setup();
        await fillAndSubmitForm(user);

        const [_, options] = fetchMock.mock.calls[0];
        expect(options.credentials).toBe("include");
        expect(options.headers["Content-Type"]).toBe("application/json");
    });
});

async function fillAndSubmitForm(user, overrides = {}) {
    const defaults = {
        username: 'testUser',
        password: 'testPwd1',
    }

    const data = {...defaults, ...overrides };

    await user.type(screen.getByLabelText(/username/i), data.username);
    await user.type(screen.getByLabelText(/password/i), data.password);

    await user.click(screen.getByRole("button",{ name: /sign\s+in/i}));
}