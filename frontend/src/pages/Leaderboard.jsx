// src/pages/Leaderboard.jsx

import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import { getLeaderboard } from "../api/leaderboard";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboard();

      const formatted = data.map(
        (user, index) => ({
          rank: index + 1,
          name: user.wallet_address,
          xp: user.reputation,
        })
      );

      setUsers(formatted);
    } catch (error) {
      console.error(error);
    }
  };

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
        data={users}
      />
    </>
  );
};

export default Leaderboard;