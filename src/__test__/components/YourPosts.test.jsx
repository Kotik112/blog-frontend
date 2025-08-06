import React from "react";
import { render, screen, waitFor} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import YourPosts from "../../components/YourPosts";

// Mocking the fetch API globally
const mockPosts = {
    content: [
        {
            id: 1,
            title: 'Test Post 1',
            content: 'Content 1',
            comments: [],
            image: null,
            createdBy: 'User A'
        },
        {
            id: 2,
            title: 'Test Post 2',
            content: 'Content 2',
            comments: [],
            image: null,
            createdBy: 'User B'
        }
    ],
    pageable: {
        pageNumber: 0,
        pageSize: 5,
        sort: {
            empty: false,
            sorted: true,
            unsorted: false
        },
        offset: 0,
        paged: true,
        unpaged: false
    },
    last: true,
    totalElements: 2,
    totalPages: 1,
    first: true,
    size: 5,
    number: 0,
    sort: {
        empty: false,
        sorted: true,
        unsorted: false
    },
    numberOfElements: 2,
    empty: false
};

vi.mock("../../components/BlogPost.jsx", () => ({
    default: ({ title, content, comments, image, createdBy }) => (
        <div data-testid="blog-post">
            <h2>{title}</h2>
            <p>{content}</p>
            <p>Comments: {comments.length}</p>
            <p>Created by: {createdBy.username}</p>
            {image && <img src={image} alt="Post" />}
        </div>
    )
}))

vi.mock("../../components/Comment.jsx", () => ({
    default: ({ comment }) => (
        <div data-testid="comment">
            <p>{comment.content}</p>
            <p>By: {comment.createdBy.username}</p>
        </div>
    )
}))

vi.mock("../../components/PageBar.jsx", () => ({
    default: ({ currentPage, totalPages, goToPage }) => (
        <div data-testid="page-bar">
            <p>Current Page: {currentPage + 1}</p>
            <p> Total Pages: {totalPages}</p>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}> Previous</button>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages - 1}> Next</button>
        </div>
    )
}))


describe('YourPosts component', () => {
    beforeEach(() => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockPosts)
            })
        );
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders heading and posts after fetch', async () => {
        render(<YourPosts />);

        expect(screen.getByText('Your Posts')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByTestId('blog-post')).toHaveLength(2);
        })
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
        expect(screen.getByText('Test Post 2')).toBeInTheDocument();
        expect(screen.getByTestId('page-bar')).toHaveTextContent('Current Page: 1 Total Pages: 1 Previous Next');
    })

    it('shows error message on fetch failure', async () => {
        vi.stubGlobal('fetch', () =>
            Promise.resolve({
                ok: false
            })
        );

        render(<YourPosts />);

        expect(screen.getByText('Your Posts')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Unauthorized or failed to fetch.')).toBeInTheDocument();
        });
        expect(screen.queryAllByTestId('blog-post')).toHaveLength(0);
    })

    it('shows message when no posts are found', async () => {
        vi.stubGlobal('fetch', () =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    content: [],
                    totalPages: 1,
                    totalElements: 0,
                    pageable: {
                        pageNumber: 0,
                        pageSize: 5,
                        sort: {
                            empty: false,
                            sorted: true,
                            unsorted: false
                        },
                        offset: 0,
                        paged: true,
                        unpaged: false
                    }
                })
            })
        );

        render(<YourPosts />);

        expect(screen.getByText('Your Posts')).toBeInTheDocument();
        await waitFor(() => {
          expect(screen.getByText(/no posts found./i)).toBeInTheDocument();
        })
    })
})