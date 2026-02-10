import React from "react";
import Card from "./Card";

function Analytics() {
  return (
    <>
      <div className="flex flex-col sm:flex-row w-full gap-4 mt-2 items-stretch justify-center">
        <Card title="Open Issues" count={5} color="bg-green-100" />
        <Card title="In Progress" count={3} color="bg-yellow-100" />
        <Card title="Resolved" count={7} color="bg-blue-100" />
      </div>
    </>
  );
}

export default Analytics;
