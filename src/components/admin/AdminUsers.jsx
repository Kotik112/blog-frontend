import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config.js";
import DataTable from "./DataTable.jsx";
import PageBar from "../PageBar.jsx"; // your existing component

export default function AdminUsers() {
    const [page, setPage] = useState(0);     // 0-based
    const size = 10;                         // page size you request
    const [pageData, setPageData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/admin/all-users?page=${page}&size=${size}`, {
            credentials: "include",
            headers: { Accept: "application/json" },
        })
            .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
            .then(d => { setPageData(d); setError(null); })
            .catch(e => setError(e.message));
    }, [page, size]);

    const users = pageData?.content ?? [];
    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Username", accessor: "username" },
        { header: "Email", accessor: "email" },
        { header: "First Name", accessor: "firstName" },
        { header: "Last Name", accessor: "lastName" },
    ]

    return (
        <div className="relative min-h-[80vh] pb-16">
            <h1 className="text-xl font-bold mb-4">Users</h1>
            {error && <p className="text-red-600">{error}</p>}
            <DataTable
                columns={columns}
                data={users}
            />
            <PageBar
                currentPage={page}
                totalPages={pageData?.totalPages ?? 1}
                goToPage={setPage}
            />
        </div>
    );
}
