import React from 'react';
import PageBar from "../../components/PageBar.jsx"
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {renderWithRouter} from "../testingUtils/util.jsx";

describe('<PageBar />', async () => {

    it('Renders the range text', () => {
        renderWithRouter(<PageBar currentPage={0} totalPages={42} goToPage={vi.fn()} />);

        const range = screen.getByText((_, el) =>
            el?.tagName.toLowerCase() === 'span' &&
            el.classList.contains('text-sm') &&
            /0\s*to\s*10\s*of\s*42\s*pages/i.test(el.textContent || '')
        );
        expect(range).toBeInTheDocument();
    });

    it('Disables Prev on first page and does not call goToPage', async () => {
        const goToPage = vi.fn();
        const user = userEvent.setup();
        renderWithRouter(<PageBar currentPage={0} totalPages={5} goToPage={goToPage} />);

        const prevBtn = screen.getByRole("button", { name: /prev/i});
        expect(prevBtn).toBeDisabled();

        await user.click(prevBtn);
        expect(goToPage).not.toHaveBeenCalled();
    });

    it('Disables Next on last page and does not call goToPage', async () => {
        const goToPage = vi.fn();
        const user = userEvent.setup();
        renderWithRouter(<PageBar currentPage={4} totalPages={5} goToPage={goToPage} />);

        const nextBtn = screen.getByRole("button", { name: /next/i});
        expect(nextBtn).toBeDisabled();

        await user.click(nextBtn);
        expect(goToPage).not.toHaveBeenCalled();
    });

    it('clicking Next calls goToPage with currentPage + 1', async () => {
        const goToPage = vi.fn();
        const user = userEvent.setup();
        renderWithRouter(<PageBar currentPage={2} totalPages={5} goToPage={goToPage} />);

        const nextBtn = screen.getByRole("button", { name: /next/i});
        await user.click(nextBtn);

        expect(goToPage).toHaveBeenCalledTimes(1);
        expect(goToPage).toHaveBeenCalledWith(3);
    });

    it('clicking Prev calls goToPage with currentPage - 1', async () => {
        const goToPage = vi.fn();
        const user = userEvent.setup();
        renderWithRouter(<PageBar currentPage={3} totalPages={5} goToPage={goToPage} />);

        const prevBtn = screen.getByRole("button", { name: /prev/i});
        await user.click(prevBtn);

        expect(goToPage).toHaveBeenCalledTimes(1);
        expect(goToPage).toHaveBeenCalledWith(2);
    });

    it("handles tiny totals gracefully", () => {
        renderWithRouter(<PageBar currentPage={0} totalPages={1} goToPage={vi.fn()} />);
        const range = screen.getByText((_, el) =>
            el?.tagName.toLowerCase() === 'span' &&
            el.classList.contains('text-sm') &&
            /0\s+to\s+1\s+of\s+1\s+Pages/i.test(el.textContent || '')
        );
        expect(range).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
        expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    });
})