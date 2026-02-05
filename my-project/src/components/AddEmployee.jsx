import { useState } from "react";

export default function AddEmployee({ onSuccess }) {
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    department: "",
    salary: "",
    experience: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          salary: Number(formData.salary),
          experience: Number(formData.experience),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error adding employee");
        return;
      }

      setSuccess("Employee added successfully!");
      setFormData({
        employeeId: "",
        name: "",
        department: "",
        salary: "",
        experience: "",
      });
      setTimeout(() => {
        setSuccess("");
        onSuccess();
      }, 1500);
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>

      <div className="bg-white p-6 rounded-lg shadow max-w-md">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="e.g., EMP001"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Full name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="e.g., IT, HR"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="e.g., 50000"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="e.g., 5"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-600"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}
