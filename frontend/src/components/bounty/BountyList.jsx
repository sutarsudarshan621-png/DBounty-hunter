// src/components/bounty/BountyList.jsx

import BountyCard from "./BountyCard";

const BountyList = ({ bounties }) => {
  if (!bounties?.length) {
    return (
      <div className="text-center py-10">
        No bounties found.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bounties.map((bounty) => (
        <BountyCard
          key={bounty.id}
          bounty={bounty}
        />
      ))}
    </div>
  );
};

export default BountyList;