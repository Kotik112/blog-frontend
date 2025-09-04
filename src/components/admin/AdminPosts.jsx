import {useEffect, useState} from "react";
import {BASE_URL} from "../../utils/config.js";
import DataTable from "./DataTable.jsx";
import PageBar from "../PageBar.jsx";

export default function AdminPosts() {
    const [page, setPage] = useState(0);     // 0-based
    const size = 10;                         // page size you request
    const [pageData, setPageData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/admin/all-posts?page=${page}&size=${size}`, {
            credentials: "include",
            headers: { Accept: "application/json" },
        })
            .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
            //.then(data => {console.log(data); return data;})
            .then(d => { setPageData(d); setError(null); })
            .catch(e => setError(e.message));
    }, [page, size]);

    const posts = (pageData?.content ?? []).slice().sort((a, b) => a.id - b.id);
    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Title", accessor: "title" },
        { header: "Content", render: (row) => row.content},
        { header: "Created At", render: (row) => new Date(row.createdAt).toLocaleString() },
        { header: "Created By", render: (row) => (row.createdBy) },
    ];

    return (
        <div className="relative min-h-[80vh] pb-16">
            <h1 className="text-xl font-bold mb-4">Users</h1>
            {error && <p className="text-red-600">{error}</p>}
            <DataTable
                columns={columns}
                data={posts}
            />
            <PageBar
                currentPage={page}
                totalPages={pageData?.totalPages ?? 1}
                goToPage={setPage}
            />
        </div>
    );
}