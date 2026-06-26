import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import SubmissionForm from "../components/bounty/SubmissionForm";

import { getBounty } from "../api/bounties";

const BountyDetails = () => {
  const { id } = useParams();

  const [bounty, setBounty] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadBounty();
  }, [id]);

  const loadBounty = async () => {
    try {
      const data =
        await getBounty(id);

      setBounty(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        Loading bounty...
      </DashboardLayout>
    );
  }

  if (!bounty) {
    return (
      <DashboardLayout>
        Bounty not found.
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        {bounty.title}
      </h1>

      <div className="border rounded-xl p-6 mb-6">
        <p className="mb-4">
          {bounty.description}
        </p>

        <div>
          Reward:
          {" "}
          {bounty.reward_amount}
          {" "}
          {bounty.reward_asset}
        </div>

        <div>
          Category:
          {" "}
          {bounty.category}
        </div>

        <div>
          Status:
          {" "}
          {bounty.status}
        </div>

        <div>
          Deadline:
          {" "}
          {new Date(
            bounty.deadline
          ).toLocaleString()}
        </div>
      </div>

      <SubmissionForm
        bountyId={id}
      />
    </DashboardLayout>
  );
};

export default BountyDetails;