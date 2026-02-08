import React from "react";

function Table({
  allIssues,
  handleDeleteIssue,
  currentPage,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.ceil(allIssues.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedIssues = allIssues.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <table className="table-auto w-full bg-white rounded-lg shadow-md text-left h-1/2">
        <thead>
          <tr className="h-8 bg-gray-200">
            {["ID", "Title", "Status", "Priority", "Delete"].map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-gray-700 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedIssues.map((issue) => {
            let statusColor = "";
            switch (issue.status) {
              case "open":
                statusColor = "bg-green-100 text-green-700";
                break;
              case "in progress":
                statusColor = "bg-yellow-100 text-yellow-700";
                break;
              case "resolved":
                statusColor = "bg-blue-100 text-blue-700";
                break;
              default:
                statusColor = "bg-gray-400/10 text-gray-400";
            }
            let priorityColor = "";
            switch (issue.priority) {
              case "high":
                priorityColor = "bg-red-100 text-red-700";

                break;
              case "medium":
                priorityColor = "bg-yellow-100 text-yellow-700";

                break;
              case "low":
                priorityColor = "bg-green-100 text-green-700";
                break;
              default:
                priorityColor = "bg-gray-400/10 text-gray-400";
            }
            return (
              <tr key={issue.id} className="h-8">
                <td>{issue.id}</td>
                <td>{issue.title}</td>
                {/* <td>{issue.description}</td> */}
                <td>
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring inset-ring-gray-400/20 ${statusColor}`}
                  >
                    {issue.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring inset-ring-gray-400/20 ${priorityColor}`}
                  >
                    {issue.priority}
                  </span>
                </td>
                <td>
                  <button
                    className="px-2 py-1 rounded bg-red-500 text-white text-xs font-semibold hover:bg-red-600"
                    onClick={() => handleDeleteIssue(issue.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        {/* Pagination controls */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </table>
    </>
  );
}

export default Table;
