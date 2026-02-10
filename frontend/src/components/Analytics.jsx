import { useEffect, useState } from "react";
import Card from "./Card";
import { BASE_URL } from "../config";

function Analytics() {
  const [statusCounts, setStatusCounts] = useState({
    Open: 0,
    "In Progress": 0,
    Resolved: 0,
  });
  useEffect(() => {
    fetchStatusCounts();
  }, []);

  // fetch status counts
  const fetchStatusCounts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/issues/status-counts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const statusCount = data.statusCounts;
        console.log("Status counts:", statusCount);
        setStatusCounts({
          Open: statusCount.find((item) => item.status === "open")?.count || 0,
          "In Progress":
            statusCount.find((item) => item.status === "in progress")?.count ||
            0,
          Resolved:
            statusCount.find((item) => item.status === "resolved")?.count || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching status counts:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row w-full gap-4 mt-2 items-stretch justify-center">
        <Card
          title="Open Issues"
          count={statusCounts.Open}
          color="bg-green-100"
        />
        <Card
          title="In Progress"
          count={statusCounts["In Progress"]}
          color="bg-yellow-100"
        />
        <Card
          title="Resolved"
          count={statusCounts.Resolved}
          color="bg-blue-100"
        />
      </div>
    </>
  );
}

export default Analytics;
