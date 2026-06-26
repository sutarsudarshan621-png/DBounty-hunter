import { useEffect, useState } from "react";
import { getBounties } from "../api/bounties";
import { Link } from "react-router-dom";

const Bounties = () => {
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBounties();
  }, []);

  const loadBounties = async () => {
    try {
      const data = await getBounties();

      setBounties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading bounties...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Open Bounties</h1>

      <div className="grid gap-4">
        {bounties.map((bounty) => (
          <Link to={`/bounties/${bounty.id}`} key={bounty.id}>
            <div className="border rounded-lg p-4 hover:shadow-lg">
              <h2 className="text-xl font-bold">{bounty.title}</h2>

              <p>{bounty.description}</p>

              <div>
                Reward: {bounty.reward_amount} {bounty.reward_asset}
              </div>

              <div>Status: {bounty.status}</div>

              <div>Category: {bounty.category}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bounties;
