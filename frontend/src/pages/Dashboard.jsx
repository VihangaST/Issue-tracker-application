import React from "react";
import Table from "../components/Table";
import SelectComponent from "../components/SelectComponent";
import { useState, useEffect } from "react";
import useFormStore from "../store/useFormStore";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { BASE_URL } from "../config";
import useAuthStore from "../store/useAuthStore";
import Analytics from "../components/Analytics";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

import ConfirmationDialog from "../components/ConfirmationDialog";
import { exportToJSON } from "../utils/exportUtils";
import authenticateToken from "../../../backend/middleware/authenticateToken";

function Dashboard() {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [allIssues, setAllIssues] = useState([]);
  const [totalIssues, setTotalIssues] = useState(0);
  const token = useAuthStore((state) => state.token);

  const navigate = useNavigate();

  const [statusCounts, setStatusCounts] = useState({
    Open: 0,
    "In Progress": 0,
    Resolved: 0,
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [shouldFetch, setShouldFetch] = useState(false);

  // modal
  const [showModal, setShowModal] = useState(false);

  // Zustand form state
  const formData = useFormStore((state) => state.formData);
  const setFormData = useFormStore((state) => state.setFormData);
  const resetFormData = useFormStore((state) => state.resetFormData);
  const logout = useAuthStore((state) => state.logout);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // delete confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  //  handle authentication errors globally
  const handleAuthError = async (response) => {
    if (response.status === 401 || response.status === 403) {
      setToast({
        open: true,
        message: "Session expired. Please log in again.",
        type: "error",
      });
      await logout();
      await navigate("/");
    } else {
      setToast({
        open: true,
        message: "An error occurred. Please try again.",
        type: "error",
      });
    }
  };
  // fetch status counts by status
  const fetchStatusCounts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/issues/status-counts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        const statusCount = data.statusCounts;
        setToast({
          open: true,
          message: "Status counts fetched successfully!",
          type: "success",
        });
        setStatusCounts({
          Open: statusCount.find((item) => item.status === "open")?.count || 0,
          "In Progress":
            statusCount.find((item) => item.status === "in progress")?.count ||
            0,
          Resolved:
            statusCount.find((item) => item.status === "resolved")?.count || 0,
        });
      } else {
        handleAuthError(response, logout, setToast);
        console.error("Failed to fetch status counts:", data.message);
      }
    } catch (error) {
      setToast({
        open: true,
        message: "Error fetching status counts",
        type: "error",
      });

      console.error("Error fetching status counts:", error);
    }
  };

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

      const data = await response.json();
      if (response.ok) {
        setAllIssues(data.issues);
        setTotalIssues(data.totalIssueCount || 0);
        setShowModal(false);

        setToast({
          open: true,
          message: "Issues fetched successfully!",
          type: "success",
        });
      } else {
        console.error("Failed to fetch issues:", data.message);
        handleAuthError(response, logout, setToast);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
      setToast({
        open: true,
        message: "Error fetching issues: " + error.message,
        type: "error",
      });
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
      const data = await response.json();
      if (response.ok) {
        setToast({
          open: true,
          message: "Issue added successfully!",
          type: "success",
        });
        setShouldFetch(true);
      } else {
        console.error("Failed to add issue:", data.message);
        handleAuthError(response, logout, setToast);
      }

      resetFormData();
    } catch (error) {
      console.error("Error adding new issue:", error);
      setToast({
        open: true,
        message: "Error adding new issue: " + error.message,
        type: "error",
      });
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
    setShouldFetch(true);
  };

  // handle delete issue
  const handleDeleteIssue = (id) => {
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };
  // handle delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(
        `${BASE_URL}/api/issues/delete/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );
      if (response.ok) {
        setToast({
          open: true,
          message: "Issue deleted successfully!",
          type: "success",
        });
        setShouldFetch(true);
      } else {
        handleAuthError(response, logout, setToast);
        console.error("Failed to delete issue:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
      authenticateToken(logout, setToast);
    }
    setDeleteConfirmOpen(false);
    setDeleteId(null);
  };

  // cancel delete
  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setDeleteId(null);
  };

  // handle row click to open modal with issue data
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

  // handle update issues
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
      const data = await response.json();

      if (response.ok) {
        setToast({
          open: true,
          message: "Issue updated successfully!",
          type: "success",
        });
        setShouldFetch(true);
      } else {
        console.error("Failed to update issue:", data.message);
        handleAuthError(response, logout, setToast);
      }
    } catch (error) {
      console.error("Error updating issue:", error);
      setToast({
        open: true,
        message: "Error updating issue: " + error.message,
        type: "error",
      });
    }
    setIsEdit(false);
    setShowModal(false);
  };

  // fetch issues on page change
  useEffect(() => {
    fetchIssues({ preventDefault: () => {} });
  }, [currentPage]);

  // fetch status counts on component mount
  useEffect(() => {
    fetchStatusCounts();
  }, []);

  // fetch issues and status counts after add/update/delete
  useEffect(() => {
    if (shouldFetch) {
      fetchIssues();
      fetchStatusCounts();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  return (
    <>
      {toast.open && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      )}
      <div className="min-h-screen flex flex-col items-center justify-start bg-white px-2 sm:px-8 pt-16 pb-4">
        <div className="w-full flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="w-full flex flex-col lg:flex-row md:items-center bg-gray-100 rounded-lg ">
            <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center gap-2 md:mb-0">
              {" "}
              <input
                type="text"
                placeholder="Search issues..."
                className="mb-2 p-2 rounded border text-gray-700 border-gray-300 w-full md:w-48"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {/* status filter */}
              <SelectComponent
                filter={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
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
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setCurrentPage(1);
                }}
                name="priority"
                options={[
                  { label: "Select Priority", value: "" },
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" },
                ]}
                isEdit={true}
              />
              <div className="w-full md:w-1/3  flex flex-row items-center justify-end gap-2">
                {/* reset button */}
                <Button
                  onClickFunction={handleReset}
                  name={"Reset"}
                  color="cyan1"
                />{" "}
                {/* search button */}
                <Button
                  onClickFunction={fetchIssues}
                  name={"Search"}
                  color="cyan1"
                />
              </div>
            </div>
            <div className="w-full md:w-1/4 flex flex-row items-center justify-end gap-2">
              <Button
                onClickFunction={() => exportToJSON(allIssues)}
                name={"Export JSON"}
                color="cyan2"
              />
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
                color="cyan2"
              />
            </div>{" "}
          </div>{" "}
          <Table
            allIssues={allIssues}
            handleDeleteIssue={handleDeleteIssue}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onRowClick={handleRowClick}
          />
          <ConfirmationDialog
            open={deleteConfirmOpen}
            message="Are you sure you want to delete this issue?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
          {/* Pagination Controls */}
          {totalIssues > 0 && (
            <div className="flex justify-center items-center mt-4">
              <button
                className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-700 border border-gray-400 hover:bg-gray-400 disabled:opacity-50"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from(
                { length: Math.ceil(totalIssues / pageSize) },
                (_, i) => (
                  <button
                    key={i + 1}
                    className={`mx-1 px-3 py-1 rounded bg-cyan-700 hover:bg-cyan-600 ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500 border border-blue-500"}`}
                    onClick={() => setCurrentPage(i + 1)}
                    disabled={currentPage === i + 1}
                  >
                    {i + 1}
                  </button>
                ),
              )}
              <button
                className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-700 border border-gray-400 hover:bg-gray-400 disabled:opacity-50"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === Math.ceil(totalIssues / pageSize)}
              >
                Next
              </button>
            </div>
          )}
        </div>
        {/* issue counts based on status */}
        <Analytics statusCounts={statusCounts} />

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
