import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyBounties,
  deleteBounty,
} from "../api/myBounties";

const MyBounties = () => {
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBounties = async () => {
    try {
      const data = await getMyBounties();
      setBounties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBounties();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this bounty?")) return;

    try {
      await deleteBounty(id);
      loadBounties();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">
        My Bounties
      </h1>

      {bounties.map((bounty) => (
        <div
          key={bounty.id}
          className="border rounded-xl p-5"
        >
          <h2 className="text-xl font-bold">
            {bounty.title}
          </h2>

          <p>{bounty.description}</p>

          <div className="mt-2">
            Reward: {bounty.reward_amount}{" "}
            {bounty.reward_asset}
          </div>

          <div>Status: {bounty.status}</div>

          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-blue-600 rounded">
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(bounty.id)
              }
              className="px-4 py-2 bg-red-600 rounded"
            >
              Delete
            </button>

            <Link
              to={`/bounties/${bounty.id}/submissions`}
              className="px-4 py-2 bg-green-600 rounded"
            >
              View Submissions
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBounties;