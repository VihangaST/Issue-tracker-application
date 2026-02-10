import React from "react";
import Table from "../components/Table";
import SelectComponent from "../components/SelectComponent";
import { useState, useEffect } from "react";
import useFormStore from "../store/useFormStore";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { BASE_URL } from "../config";
import useAuthStore from "../store/useAuthStore";

function Dashboard() {
  // For editing/viewing an issue in modal
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [allIssues, setAllIssues] = useState([]);
  const [totalIssues, setTotalIssues] = useState(0);
  const token = useAuthStore((state) => state.token);

  // modal
  const [showModal, setShowModal] = useState(false);

  // Zustand form state
  const formData = useFormStore((state) => state.formData);
  const setFormData = useFormStore((state) => state.setFormData);
  const resetFormData = useFormStore((state) => state.resetFormData);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchIssues({ preventDefault: () => {} });
  }, [currentPage]);

  // fetch issues based on search and filter
  const fetchIssues = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    try {
      const params = new URLSearchParams({
        searchTerm,
        statusFilter,
        priorityFilter,
        page: currentPage,
        pageSize,
      });
      const response = await fetch(
        `${BASE_URL}/api/issues/fetch?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );
      alert("called");

      const data = await response.json();
      console.log("Fetched issues:", data);
      if (response.ok) {
        setAllIssues(data.issues);
        setTotalIssues(data.totalIssueCount || 0);
        setShowModal(false);

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

  // handle AddNewIssue
  const handleAddNewIssue = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/issues/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          formData,
        }),
      });
      if (response.ok) {
        alert("Issue added successfully!");
        fetchIssues(new Event("submit"));
      }
      resetFormData();
    } catch (error) {
      console.error("Error adding new issue:", error);
    }
  };

  // handleReset function
  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPriorityFilter("");
    setAllIssues([]);
    setTotalIssues(0);
    setCurrentPage(1);
  };

  // handleDeleteIssue function
  const handleDeleteIssue = async (id) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/issues/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (response.ok) {
        alert("Issue deleted successfully!");
      } else {
        alert("Failed to delete issue");
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
      alert("Error deleting issue: " + error.message);
    }
  };

  // Handle row click to open modal with issue data
  const handleRowClick = (issue) => {
    setSelectedIssue(issue);
    setFormData({
      title: issue.title,
      description: issue.description,
      status: issue.status,
      priority: issue.priority,
    });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleUpdateIssue = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/issues/update/${selectedIssue.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            formData,
          }),
        },
      );

      if (response.ok) {
        alert("Issue updated successfully!");
        // fetchIssues(new Event("submit"));
      } else {
        const data = await response.json();
        console.error("Failed to update issue:", data.message);
        alert("Failed to update issue");
      }
    } catch (error) {
      console.error("Error updating issue:", error);
      alert("Error updating issue: " + error.message);
    }

    alert("Update issue functionality");
    setIsEdit(false);
    setShowModal(false);
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
            onChange={(e) => setStatusFilter(e.target.value)}
            name="status"
            options={[
              { label: "Select Status", value: "" },
              { label: "Open", value: "open" },
              { label: "In progress", value: "in progress" },
              { label: "Resolved", value: "resolved" },
            ]}
            isEdit={true}
          />
          {/* priority filter */}
          <SelectComponent
            filter={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            name="priority"
            options={[
              { label: "Select Priority", value: "" },
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" },
            ]}
            isEdit={true}
          />
          {/* search button */}
          <Button onClickFunction={fetchIssues} name={"Search"} />
          {/* reset button */}
          <Button onClickFunction={handleReset} name={"Reset"} />
        </div>
        <div className="w-full flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
          <Table
            allIssues={allIssues}
            handleDeleteIssue={handleDeleteIssue}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onRowClick={handleRowClick}
          />
          {/* Pagination Controls */}
          {totalIssues > 0 && (
            <div className="flex justify-center mt-4">
              {Array.from(
                { length: Math.ceil(totalIssues / pageSize) },
                (_, i) => (
                  <button
                    key={i + 1}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500 border border-blue-500"}`}
                    onClick={() => setCurrentPage(i + 1)}
                    disabled={currentPage === i + 1}
                  >
                    {i + 1}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
        <Button
          onClickFunction={() => {
            setShowModal(true);
            setSelectedIssue(null);
            setFormData({
              title: "",
              description: "",
              status: "open",
              priority: "medium",
            });
            setIsEdit(true);
          }}
          name={"Add New Issue"}
        />
        {showModal && (
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedIssue && isEdit) {
                handleUpdateIssue();
              } else if (!selectedIssue) {
                handleAddNewIssue();
              }
            }}
            formData={formData}
            setFormData={setFormData}
            title={
              selectedIssue
                ? isEdit
                  ? "Edit Issue"
                  : "View Issue"
                : "Add New Issue"
            }
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          ></Modal>
        )}
      </div>
    </>
  );
}

export default Dashboard;
