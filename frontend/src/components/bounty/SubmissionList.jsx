import {
  approveSubmission,
  rejectSubmission,
} from "../../api/submissions";

const SubmissionList = ({
  submissions,
  onRefresh,
}) => {
  const handleApprove = async (
    submissionId
  ) => {
    try {
      await approveSubmission(
        submissionId
      );

      onRefresh?.();
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

      onRefresh?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {submissions.map(
        (submission) => (
          <div
            key={submission.id}
            className="border rounded-xl p-4"
          >
            <div>
              Status:
              {" "}
              {submission.status}
            </div>

            <div>
              Proof:
              {" "}
              {submission.proof_hash}
            </div>

            <div>
              Content:
              {" "}
              {submission.content}
            </div>

            {submission.status ===
              "pending" && (
              <div className="flex gap-2 mt-4">
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
            )}
          </div>
        )
      )}
    </div>
  );
};

export default SubmissionList;