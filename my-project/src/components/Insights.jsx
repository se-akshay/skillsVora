import { useState, useEffect } from "react";

export default function Insights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://skills-vora.vercel.app/api/employee/insights/data",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setInsights(data);
    } catch (err) {
      alert("Error fetching insights");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (!insights)
    return (
      <div className="text-center py-8 text-gray-500">No data available</div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Employee Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium opacity-90 mb-2">
            Total Employees
          </h3>
          <p className="text-4xl font-bold">{insights.totalEmployees}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium opacity-90 mb-2">Departments</h3>
          <div className="text-sm space-y-1">
            {insights.departmentWiseCount.map((item) => (
              <p key={item._id}>
                <strong>{item._id}:</strong> {item.count}
              </p>
            ))}
          </div>
        </div>

        {insights.highestPaidEmployee && (
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium opacity-90 mb-2">
              Highest Paid Employee
            </h3>
            <p className="font-bold">{insights.highestPaidEmployee.name}</p>
            <p className="text-sm opacity-90">
              ₹{insights.highestPaidEmployee.salary.toLocaleString()}
            </p>
            <p className="text-sm opacity-90">
              {insights.highestPaidEmployee.department}
            </p>
          </div>
        )}

        <div className="bg-orange-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium opacity-90 mb-2">
            Avg Salary per Department
          </h3>
          <div className="text-sm space-y-1">
            {insights.avgSalaryPerDepartment.map((item) => (
              <p key={item._id}>
                <strong>{item._id}:</strong> ₹
                {Math.round(item.avgSalary).toLocaleString()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
