import React from "react";
import Table from "../components/Table";
import SelectComponent from "../components/SelectComponent";
import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [allIssues, setAllIssues] = useState([]);

  // modal
  const [showModal, setShowModal] = useState(false);

  // fetch issues based on search and filter
  const fetchIssues = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams({
        searchTerm,
        statusFilter,
        priorityFilter,
      });
      const response = await fetch(
        `http://localhost:5000/api/issues/fetch?${params.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      alert("called");

      const data = await response.json();
      console.log("Fetched issues:", data);
      if (response.ok) {
        setAllIssues(data.issues);

        console.log("Issues set in state:", data.issues);
        alert("Issues fetched successfully!");
      } else {
        console.error("Failed to fetch issues:", data.message);
        alert("Failed to fetch issues: " + data.message);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  // handleReset function
  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPriorityFilter("");
    setAllIssues([]);
  };

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
          {/* search button */}
          <Button onClickFunction={fetchIssues} name={"Search"} />
          {/* reset button */}
          <Button onClickFunction={handleReset} name={"Reset"} />
        </div>
        <div className="w-full flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
          <Table allIssues={allIssues} />
        </div>
        <Button
          onClickFunction={() => setShowModal(true)}
          name={"Add New Issue"}
        />
        {showModal && (
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={(e) => {
              e.preventDefault();

              setShowModal(false);
            }}
            title="Add New Issue"
          ></Modal>
        )}
      </div>
    </>
  );
}

export default Dashboard;
