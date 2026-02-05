import { useState, useEffect } from "react";
import EditEmployeeModal from "./EditEmployeeModal";

export default function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://skills-vora.vercel.app/api/employee",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      alert("Error fetching employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://skills-vora.vercel.app/api/employee/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        setEmployees(employees.filter((e) => e._id !== id));
        alert("Employee deleted");
      }
    } catch (err) {
      alert("Error deleting employee");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Employees</h2>
      <button
        onClick={fetchEmployees}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Refresh
      </button>

      {employees.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No employees found</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">Employee ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Department</th>
                <th className="px-6 py-3 text-left">Salary</th>
                <th className="px-6 py-3 text-left">Experience</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{emp.employeeId}</td>
                  <td className="px-6 py-3">{emp.name}</td>
                  <td className="px-6 py-3">{emp.department}</td>
                  <td className="px-6 py-3">₹{emp.salary.toLocaleString()}</td>
                  <td className="px-6 py-3">{emp.experience} years</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => setEditingEmployee(emp)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSuccess={() => {
            setEditingEmployee(null);
            fetchEmployees();
          }}
        />
      )}
    </div>
  );
}
