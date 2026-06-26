const API_URL =
  import.meta.env.VITE_API_URL;

export const getUserTransactions =
  async (userId) => {
    const response = await fetch(
      `${API_URL}/api/transactions/user/${userId}`
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
          "Failed to load transactions"
      );
    }

    return data;
  };