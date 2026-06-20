// src/hooks/useWallet.js

import useWalletStore from "../store/walletStore";
import {
  connectWallet,
  disconnectWallet,
  getStoredWallet,
} from "../services/walletService";

const useWallet = () => {
  const {
    walletAddress,
    isConnected,
    connect,
    disconnect,
  } = useWalletStore();

  const handleConnect = async () => {
    const result = await connectWallet();

    if (
  result.success &&
  result.publicKey
) {
  connect(result.publicKey);

  localStorage.setItem(
    "walletAddress",
    result.publicKey
  );
}

    return result;
  };

  const handleDisconnect = () => {
    disconnectWallet();
    disconnect();
  };

  const restoreSession = () => {
    const storedWallet = getStoredWallet();

    if (storedWallet) {
      connect(storedWallet);
    }
  };

  return {
    walletAddress,
    isConnected,
    handleConnect,
    handleDisconnect,
    restoreSession,
  };
};

export default useWallet;