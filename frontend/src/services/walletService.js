import {
  getAddress,
  requestAccess,
} from "@stellar/freighter-api";

export const connectWallet = async () => {
  try {
    const access = await requestAccess();

    console.log("Access:", access);

    const result = await getAddress();

    console.log("Address:", result);

    if (!result.address) {
      throw new Error(
        "No Freighter account selected"
      );
    }

    return {
      success: true,
      publicKey: result.address,
    };
  } catch (error) {
    console.error(error);

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