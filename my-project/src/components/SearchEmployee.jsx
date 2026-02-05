import { useState } from "react";

export default function SearchEmployee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://skills-vora.vercel.app/api/employee/search/query?search=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setResults(Array.isArray(data) ? data : []);
      setSearched(true);
    } catch (err) {
      alert("Error searching");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Search Employees</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6 max-w-md">
        <label className="block text-sm font-medium mb-2">
          Search by Name or Department
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter name or department..."
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {searched && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {results.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No employees found
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">Employee ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Department</th>
                  <th className="px-6 py-3 text-left">Salary</th>
                  <th className="px-6 py-3 text-left">Experience</th>
                </tr>
              </thead>
              <tbody>
                {results.map((emp) => (
                  <tr key={emp._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{emp.employeeId}</td>
                    <td className="px-6 py-3">{emp.name}</td>
                    <td className="px-6 py-3">{emp.department}</td>
                    <td className="px-6 py-3">
                      ₹{emp.salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-3">{emp.experience} years</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
