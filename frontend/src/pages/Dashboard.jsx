import React from "react";
import Table from "../components/Table";
import SelectComponent from "../components/SelectComponent";
import { useState } from "react";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [allIssues, setAllIssues] = useState([]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-500 p-8">
        <h1 className="text-4xl font-bold mb-8 mt-8 text-center text-white">
          Dashboard
        </h1>

        <div className="w-full flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search issues..."
            className="mb-4 p-2 rounded border border-gray-300 mr-4 w-full md:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* status filter */}
          <SelectComponent
            filter={statusFilter}
            onchange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: "Select Status", value: "" },
              { label: "Open", value: "open" },
              { label: "In progress", value: "in progress" },
              { label: "Resolved", value: "resolved" },
            ]}
          />
          {/* priority filter */}
          <SelectComponent
            filter={priorityFilter}
            options={[
              { label: "Select Priority", value: "" },
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" },
            ]}
            onchange={(e) => setPriorityFilter(e.target.value)}
          />
          <button
            className="mb-4 p-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 w-full md:w-auto"
            onClick={fetchIssues}
          >
            Search
          </button>
        </div>
        <div className="w-full flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
          <Table allIssues={allIssues} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
