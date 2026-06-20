export const getToken = () =>
  localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem(
    "walletAddress"
  );
};

export const isAuthenticated =
  () => !!getToken();