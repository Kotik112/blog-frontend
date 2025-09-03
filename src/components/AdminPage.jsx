import {useEffect, useState} from "react";
import {BASE_URL} from "../utils/config.js";

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
               console.log(data.content)
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
                <table className="w-full border-collapse bg-[#d1edff]">
                    <thead>
                    <tr className="bg-gray-200 border-2 border-gray-300">
                        <th className="p-2 border-black border-r-2">ID</th>
                        <th className="p-2 border-black border-r-2">Username</th>
                        <th className="p-2 border-black border-r-2">Email</th>
                        <th className="p-2 border-black border-r-2">First Name</th>
                        <th className="p-2">Last Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="p-2 text-center">{user.id}</td>
                            <td className="p-2 text-center">{user.username}</td>
                            <td className="p-2 text-center">{user.email}</td>
                            <td className="p-2 text-center">{user.firstName}</td>
                            <td className="p-2 text-center">{user.lastName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}