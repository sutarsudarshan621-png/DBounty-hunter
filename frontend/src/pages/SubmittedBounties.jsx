import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getSubmittedBounties } from "../api/bounties";

const SubmittedBounties = () => {
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBounties();
  }, []);

  const loadBounties = async () => {
    try {
      const data = await getSubmittedBounties();
      setBounties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        Loading submitted bounties...
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Submitted Bounties
      </h1>

      {bounties.length === 0 ? (
        <div>No submitted bounties found.</div>
      ) : (
        <div className="space-y-5">
          {bounties.map((bounty) => (
            <div
              key={bounty.id}
              className="border rounded-xl p-6"
            >
              <h2 className="text-xl font-bold">
                {bounty.title}
              </h2>

              <p className="mt-2">
                {bounty.description}
              </p>

              <div className="mt-4">
                Reward: {bounty.reward_amount}{" "}
                {bounty.reward_asset}
              </div>

              <div>
                Category: {bounty.category}
              </div>

              <div>
                Status: {bounty.status}
              </div>

              <Link
                to={`/bounties/${bounty.id}/submissions`}
                className="inline-block mt-5 px-4 py-2 bg-blue-600 rounded-lg text-white"
              >
                View Submissions
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SubmittedBounties;