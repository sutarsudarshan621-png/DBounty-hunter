// frontend/src/api/bounties.js

const API_URL = import.meta.env.VITE_API_URL;

export const getBounties = async () => {
  const response = await fetch(
    `${API_URL}/api/bounties`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to load bounties"
    );
  }

  return data;
};

export const getBounty = async (id) => {
  const response = await fetch(
    `${API_URL}/api/bounties/${id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to load bounty"
    );
  }

  return data;
};

export const createBounty = async (bountyData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/bounties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bountyData),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
};

export const getSubmittedBounties = async () => {
  const response = await fetch(
    `${API_URL}/api/bounties/submitted`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to load submitted bounties"
    );
  }

  return data;
};