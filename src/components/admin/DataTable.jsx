import PropTypes from "prop-types";

export default function DataTable({ columns, data }) {
    console.log(data)
    return (
        <table className="w-full border-collapse bg-[#d1edff]">
            <thead>
                <tr className="bg-gray-200 border-2 border-gray-300">
                    {columns.map(col => (
                        <th
                            key={col.accessor || col.header}
                            className="p-2 border-black border-r-2 last:border-r-0"
                        >
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {data.map(row => (
                <tr key={row.id ?? JSON.stringify(row)}>
                    {columns.map(col => (
                        <td key={col.accessor || col.header} className="p-2 text-center">
                            {col.render ? col.render(row) : row[col.accessor]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
}