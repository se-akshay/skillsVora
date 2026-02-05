export default function Navbar({ onLogout }) {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold">Employee Management</h1>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium w-full sm:w-auto"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
