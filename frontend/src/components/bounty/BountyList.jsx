import { useEffect, useState } from "react";
import { getBounties } from "../../api/bounties";

const BountyList = () => {
  const [bounties, setBounties] =
    useState([]);

  useEffect(() => {
    const load = async () => {
      const data =
        await getBounties();

      setBounties(data);
    };

    load();
  }, []);

  return (
    <div className="space-y-4">
      {bounties.map((bounty) => (
        <div
          key={bounty.id}
          className="p-4 border rounded"
        >
          <h2>{bounty.title}</h2>

          <p>
            {bounty.description}
          </p>

          <p>
            Reward:
            {" "}
            {bounty.reward_amount}
            {" "}
            {bounty.reward_asset}
          </p>

          <p>
            Status:
            {" "}
            {bounty.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BountyList;