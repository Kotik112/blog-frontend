import {useEffect, useState} from "react";
import {BASE_URL} from "../../utils/config.js";
import DataTable from "./DataTable.jsx";


export default function AdminPage() {
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
       fetch(`${BASE_URL}/api/v1/admin/all-users`,{
           method: "GET",
           credentials: 'include',
           headers: {
               'Content-Type': 'application/json',
           }
       })
           .then(response => {
               if (!response.ok) {
                   throw new Error("Unauthorized or failed to fetch.");
               }
               return response.json()
           })
           .then(data => {
               setUsers(data.content);
           })
           .catch(error => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }



    return (
        <div className="flex justify-center">
            <div className="p-4 w-3/4">
                <h1 className="text-center text-xl font-bold pb-4">All users!</h1>
                <DataTable columns={userColumns} data={users} />
            </div>
        </div>
    );
}