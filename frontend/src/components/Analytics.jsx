import Card from "./Card";
function Analytics({ statusCounts }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row w-full gap-4 mt-2 items-stretch justify-center">
        <Card
          title="Open Issues"
          count={statusCounts.Open}
          color="bg-green-100"
          fColor="text-green-400"
        />
        <Card
          title="In Progress"
          count={statusCounts["In Progress"]}
          color="bg-yellow-100"
          fColor="text-yellow-400"
        />
        <Card
          title="Resolved"
          count={statusCounts.Resolved}
          color="bg-blue-100"
          fColor="text-blue-400"
        />
      </div>
    </>
  );
}

export default Analytics;
