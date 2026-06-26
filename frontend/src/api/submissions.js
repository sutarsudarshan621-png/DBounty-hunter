// frontend/src/api/submissions.js
const API_URL = import.meta.env.VITE_API_URL;

export const createSubmission = async (
  bountyId,
  githubUrl,
  demoUrl
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/submissions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bounty_id: bountyId,
        proof_hash: githubUrl,
        content: demoUrl,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Submission failed"
    );
  }

  return data;
};

export const getBountySubmissions = async (
  bountyId
) => {
  const response = await fetch(
    `${API_URL}/api/submissions/bounty/${bountyId}`
  );

  return response.json();
};

export const approveSubmission = async (
  submissionId
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/submissions/${submissionId}/approve`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

export const rejectSubmission = async (
  submissionId
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/submissions/${submissionId}/reject`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};