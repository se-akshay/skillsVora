import { useState } from "react";

export default function FilterEmployee() {
  const [filters, setFilters] = useState({
    department: "",
    minExperience: "",
    maxExperience: "",
    minSalary: "",
    maxSalary: "",
  });
  const [results, setResults] = useState([]);
  const [filtered, setFiltered] = useState(false);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.department) params.append("department", filters.department);
      if (filters.minExperience)
        params.append("minExperience", filters.minExperience);
      if (filters.maxExperience)
        params.append("maxExperience", filters.maxExperience);
      if (filters.minSalary) params.append("minSalary", filters.minSalary);
      if (filters.maxSalary) params.append("maxSalary", filters.maxSalary);

      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/employee/filter/data?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setResults(Array.isArray(data) ? data : []);
      setFiltered(true);
    } catch (err) {
      alert("Error filtering");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Filter Employees</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={filters.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Min Experience
            </label>
            <input
              type="number"
              name="minExperience"
              value={filters.minExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Max Experience
            </label>
            <input
              type="number"
              name="maxExperience"
              value={filters.maxExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Min Salary</label>
            <input
              type="number"
              name="minSalary"
              value={filters.minSalary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Max Salary</label>
            <input
              type="number"
              name="maxSalary"
              value={filters.maxSalary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Optional"
            />
          </div>
        </div>

        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-medium"
        >
          Apply Filters
        </button>
      </div>

      {filtered && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {results.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No employees match criteria
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
