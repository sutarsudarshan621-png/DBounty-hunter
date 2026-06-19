// src/services/walletService.js

export const isFreighterInstalled = () => {
  return typeof window.freighter !== "undefined";
};

export const connectWallet = async () => {
  try {
    if (!isFreighterInstalled()) {
      throw new Error("Freighter wallet not installed");
    }

    const publicKey = await window.freighter.getPublicKey();

    return {
      success: true,
      publicKey,
    };
  } catch (error) {
    console.error("Wallet Connection Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

export const disconnectWallet = () => {
  localStorage.removeItem("walletAddress");
};

export const getStoredWallet = () => {
  return localStorage.getItem("walletAddress");
};