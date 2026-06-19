// src/pages/Bounties.jsx

import { useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import BountyFilters from "../components/bounty/BountyFilters";
import BountyList from "../components/bounty/BountyList";
import useBounties from "../hooks/useBounties";

const Bounties = () => {
  const { bounties, loading } = useBounties();

  const [difficulty, setDifficulty] = useState("");

  const filteredBounties = useMemo(() => {
    if (!difficulty) return bounties;

    return bounties.filter(
      (bounty) => bounty.difficulty === difficulty
    );
  }, [bounties, difficulty]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Explore Bounties
      </h1>

      <BountyFilters
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      {loading ? (
        <p>Loading bounties...</p>
      ) : (
        <BountyList bounties={filteredBounties} />
      )}
    </>
  );
};

export default Bounties;