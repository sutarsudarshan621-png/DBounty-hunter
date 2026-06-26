const API_URL =
  import.meta.env.VITE_API_URL;

export const getLeaderboard =
  async () => {
    const response = await fetch(
      `${API_URL}/api/leaderboard`
    );

    return response.json();
  };