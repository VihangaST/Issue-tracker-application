import React from "react";

function Table({ allIssues, handleDeleteIssue, onRowClick }) {
  // Fixed row count
  const ROW_COUNT = 10;
  const rowHeight = 32; // 8 (padding) + 16 (line height) + 8 (padding)
  const emptyRows = ROW_COUNT - allIssues.length;

  return (
    <div className="w-full overflow-x-auto">
      <table
        className="table-auto min-w-full bg-white rounded-lg shadow-md text-center"
        style={{
          minHeight: `${ROW_COUNT * rowHeight}px`,
          height: `${ROW_COUNT * rowHeight}px`,
        }}
      >
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
          {allIssues.map((issue) => {
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
              <tr
                key={issue.id}
                className="h-8 cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => {
                  // Handle row click to show issue details
                  if (onRowClick) {
                    onRowClick(issue);
                  }
                }}
              >
                <td>{issue.id}</td>
                <td>{issue.title}</td>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteIssue(issue.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          {emptyRows > 0 &&
            Array.from({ length: emptyRows }).map((_, idx) => (
              <tr key={`empty-${idx}`} className="h-8">
                <td colSpan={5}>&nbsp;</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
