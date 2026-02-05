export default function Sidebar({ setCurrentSection }) {
  const items = [
    { id: "view", label: "View Employees" },
    { id: "add", label: "Add Employee" },
    { id: "search", label: "Search" },
    { id: "filter", label: "Filter" },
    { id: "insights", label: "Insights" },
  ];

  return (
    <aside className="w-full md:w-56 bg-gray-800 text-white shadow-lg">
      <nav className="p-3 md:p-4">
        <ul className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentSection(item.id)}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition whitespace-nowrap"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
