// src/pages/Leaderboard.jsx

import DashboardLayout from "../layouts/DashboardLayout";
import Table from "../components/ui/Table";
import mockLeaderboard from "../lib/mockLeaderboard";

const Leaderboard = () => {
  const columns = [
    {
      key: "rank",
      label: "Rank",
    },
    {
      key: "name",
      label: "Builder",
    },
    {
      key: "xp",
      label: "XP",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Leaderboard
      </h1>

      <Table
        columns={columns}
        data={mockLeaderboard}
      />
    </>
  );
};

export default Leaderboard;