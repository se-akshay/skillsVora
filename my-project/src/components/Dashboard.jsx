import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ViewEmployees from "./ViewEmployees";
import AddEmployee from "./AddEmployee";
import SearchEmployee from "./SearchEmployee";
import FilterEmployee from "./FilterEmployee";
import Insights from "./Insights";

export default function Dashboard({ onLogout }) {
  const [currentSection, setCurrentSection] = useState("view");
  const [refreshData, setRefreshData] = useState(0);

  const handleRefresh = () => {
    setRefreshData((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onLogout={onLogout} />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Sidebar setCurrentSection={setCurrentSection} />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          {currentSection === "view" && <ViewEmployees key={refreshData} />}
          {currentSection === "add" && (
            <AddEmployee onSuccess={handleRefresh} />
          )}
          {currentSection === "search" && <SearchEmployee />}
          {currentSection === "filter" && <FilterEmployee />}
          {currentSection === "insights" && <Insights />}
        </main>
      </div>
    </div>
  );
}
