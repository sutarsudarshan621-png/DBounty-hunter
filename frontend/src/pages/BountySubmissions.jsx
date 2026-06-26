import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  getBountySubmissions,
  approveSubmission,
  rejectSubmission,
} from "../api/submissions";

const BountySubmissions = () => {
  const { id } = useParams();

  const [submissions, setSubmissions] =
    useState([]);

  const loadSubmissions = async () => {
    try {
      const data =
        await getBountySubmissions(id);

      setSubmissions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, [id]);

  const handleApprove = async (
    submissionId
  ) => {
    try {
      await approveSubmission(
        submissionId
      );

      await loadSubmissions();

      alert("Submission approved");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (
    submissionId
  ) => {
    try {
      await rejectSubmission(
        submissionId
      );

      await loadSubmissions();

      alert("Submission rejected");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Bounty Submissions
      </h1>

      <div className="space-y-4">
        {submissions.map(
          (submission) => (
            <div
              key={submission.id}
              className="border rounded-xl p-5"
            >
              <div>
                <strong>Status:</strong>{" "}
                {submission.status}
              </div>

              <div className="mt-2">
                <strong>
                  Github:
                </strong>{" "}
                {submission.proof_hash}
              </div>

              <div className="mt-2">
                <strong>Demo:</strong>{" "}
                {submission.content}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    handleApprove(
                      submission.id
                    )
                  }
                  className="px-4 py-2 bg-green-600 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleReject(
                      submission.id
                    )
                  }
                  className="px-4 py-2 bg-red-600 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
};

export default BountySubmissions;