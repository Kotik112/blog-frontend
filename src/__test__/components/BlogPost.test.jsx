import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest'
import BlogPost from "../../components/BlogPost.jsx";
import {renderWithRouter} from "../testingUtils/util.jsx";

describe("<BlogPost />", () => {

    beforeAll(() => {
        // Define if missing
        if (!global.URL.createObjectURL) {
            Object.defineProperty(global.URL, "createObjectURL", {
                writable: true,
                value: vi.fn(() => "blob://fake"),
            });
        }
    });

    beforeEach(() => {
        // mock URL.createObjectURL
        vi.spyOn(URL, "createObjectURL").mockReturnValue("blob://fake");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders heading and content", async () => {
        renderWithRouter(
            <BlogPost id={1} comments={[]} title={"Test Post"} content={"Test Content"} createdBy={"testUser"} />
        );

        expect(screen.getByRole("heading", { name: /test post/i })).toBeInTheDocument();
        expect(screen.getByText(/test content/i)).toBeInTheDocument();
    });

    it("renders comments", async () => {
        const comments=  [{id: 1, content: "Test Comment", createdBy: {username: "testUser"}}];
        renderWithRouter(
            <BlogPost id={1} comments={comments} title={"Test Post"} content={"Test Content"} createdBy={"testUser"} />
        );
        expect(screen.getByText(/test comment/i)).toBeInTheDocument();
        expect(screen.getByText(/testUser/i)).toBeInTheDocument();
    });

    it("renders image", async () => {
        const image = {
            id: 7,
            name: "test-image",
            type: "image/jpeg",
            createdAt: "2023-01-01T00:00:00Z",
            createdBy: "testUser",
        };

        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            blob: async () => new Blob(["fake"], { type: "image/jpeg" }),
        });

        renderWithRouter(
            <BlogPost id={1} comments={[]} title={"Test Post"} content={"Test Content"} createdBy={"testUser"} image={image} />
        );

        const img = await screen.findByAltText(/test-image/i);

        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "blob://fake");

        // sanity: called with your endpoint
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringMatching(/\/api\/v1\/images\/7$/)
        );
        expect(URL.createObjectURL).toHaveBeenCalled();
    });
});