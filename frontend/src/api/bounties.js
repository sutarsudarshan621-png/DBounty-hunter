const API_URL = import.meta.env.VITE_API_URL;

export const getBounties = async () => {
  const response = await fetch(
    `${API_URL}/api/bounties`
  );

  return response.json();
};

export const createBounty = async (
  bountyData
) => {
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

  return response.json();
};