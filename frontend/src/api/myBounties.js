const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

export const getMyBounties = async () => {
  const response = await fetch(
    `${API_URL}/api/bounties/my`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load bounties");
  }

  return data;
};


export const updateBounty = async (bountyId, bounty) => {
  const response = await fetch(
    `${API_URL}/api/bounties/${bountyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(bounty),
    }
  );

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.error || "Update failed");
  }

  return data;
};

export const deleteBounty = async (id) => {
  const response = await fetch(
    `${API_URL}/api/bounties/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Delete failed");
  }

  return data;
};