const API_URL = import.meta.env.VITE_API_URL;

export const walletLogin = async (walletAddress) => {
const response = await fetch(
  `${API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet_address: walletAddress,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

export const createBounty = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/bounties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const getBounties = async () => {
  const response = await fetch(
    `${API_URL}/api/bounties`
  );

  return response.json();
};