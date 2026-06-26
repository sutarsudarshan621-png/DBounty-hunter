const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

export const getProfile = async () => {
  const response = await fetch(
    `${API_URL}/api/users/me`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load profile");
  }

  return data;
};

export const updateProfile = async (profile) => {
  const response = await fetch(
    `${API_URL}/api/users/me`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(profile),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update profile");
  }

  return data;
};