import React from "react";
import RegisterUserForm from "../../components/RegisterUserForm.jsx";
import { render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import {ROUTES} from "../../constants/Routes.js";

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {...actual, useNavigate: () => mockNavigate}
})

describe("RegisterUserForm component", () => {
    const setup = () =>
        render(
            <MemoryRouter>
                <RegisterUserForm />
            </MemoryRouter>
        );

    beforeAll(() => {
        // If your environment doesn’t have fetch, define it
        if (!globalThis.fetch) {
            globalThis.fetch = vi.fn();
        }
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.restoreAllMocks();
    });

    it("renders labels and helper text", () => {
        setup();
        expect(
            screen.getByText(/create a new user account by filling out the form below/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/^First name/i)).toBeInTheDocument();
        expect(screen.getByText(/^Last name/i)).toBeInTheDocument();
        expect(screen.getByText(/^Username/i)).toBeInTheDocument();
        expect(screen.getByText(/^Password:/i)).toBeInTheDocument();
        expect(screen.getByText(/^Confirm password/i)).toBeInTheDocument();
        expect(screen.getByText(/^Email/i)).toBeInTheDocument();
    })

    it("shows error when passwords don't match and does not call fetch", async () => {
        setup()
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/username/i), "testUser");
        await user.type(screen.getByLabelText(/^password/i), "testPwd1");
        await user.type(screen.getByLabelText(/confirm password/i), "testPwd2");
        await user.type(screen.getByLabelText(/email/i), "a@example.com");
        await user.type(screen.getByLabelText(/first name/i), "John");
        await user.type(screen.getByLabelText(/last name/i), "Doe");

        const fetchSpy = vi.spyOn(global, "fetch");
        await user.click(screen.getByRole("button", { name: /submit/i }));

        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
        expect (fetchSpy).not.toHaveBeenCalled();
    })

    it("shows server error text when response is not ok", async () => {
        setup();
        const user = userEvent.setup();

        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: false,
            text: async () => "username taken",
            json: async () => ({}),
        });

        await fillFormAndSubmit(user)
        await waitFor(() => {
            expect(screen.getByText(/failed: username taken/i)).toBeInTheDocument();
        })
    })

    it("registers user when form is valid, resets form", async () => {
        setup();
        const user = userEvent.setup();

        const fetchSpy = vi.spyOn(global, "fetch")
            .mockResolvedValue({
            ok: true,
            text: async () => "",
            json: async () => ({}),
        });

        await fillFormAndSubmit(user)

        await waitFor(() =>
            expect(screen.getByText(/user registered successfully/i)).toBeInTheDocument()
        );

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        const [url, options] = fetchSpy.mock.calls[0];
        expect(String(url)).toMatch(/\/api\/v1\/auth\/register$/);
    })

    it("navigates after success", async () => {
        setup();
        const user = userEvent.setup();

        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: async () => ({}),
            text: async () => "",
        });

        await fillFormAndSubmit(user);

        await screen.findByText(/user registered successfully/i);

        // wait past the 1.5s redirect delay
        await new Promise(res => setTimeout(res, 1600));

        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
    });

    it("shows error when fetch fails", async () => {
        setup();
        const user = userEvent.setup();

        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: false,
            text: async () => "username taken",
            json: async () => ({}),
        });

        await fillFormAndSubmit(user);

        await waitFor(() => {
            expect(screen.getByText(/failed: username taken/i)).toBeInTheDocument();
        });
        expect(mockNavigate).not.toHaveBeenCalled();
    })

    it("shows generic error on network failure", async () => {
        setup();
        const user = userEvent.setup();

        vi.spyOn(global, "fetch").mockRejectedValue(new Error("boom"));

        await fillFormAndSubmit(user);

        await waitFor(() =>
            expect(
                screen.getByText(/failed to submit post/i)
            ).toBeInTheDocument()
        );
    });
})

async function fillFormAndSubmit(user, overrides = {}) {
    const defaults = {
        username: "testUser",
        password: "testPwd1",
        confirmPassword: "testPwd1",
        email: "jd@example.com",
        firstName: "John",
        lastName: "Doe",
    };

    const data = { ...defaults, ...overrides };

    await user.type(screen.getByLabelText(/username/i), data.username);
    await user.type(screen.getByLabelText(/^password/i), data.password);
    await user.type(screen.getByLabelText(/confirm password/i), data.confirmPassword);
    await user.type(screen.getByLabelText(/email/i), data.email);
    await user.type(screen.getByLabelText(/first name/i), data.firstName);
    await user.type(screen.getByLabelText(/last name/i), data.lastName);

    await user.click(screen.getByRole("button", { name: /submit/i }));
}