import { useState } from "react";
import useWallet from "../../hooks/useWallet";
import { walletLogin } from "../../api/auth";

const WalletConnectButton = () => {
  const [loading, setLoading] = useState(false);

  const { isConnected, handleConnect, handleDisconnect } = useWallet();

  const connect = async () => {
    setLoading(true);

    const result = await handleConnect();

    if (!result.success) {
      alert(result.error);
      setLoading(false);
      return;
    }

    try {
      const auth = await walletLogin(result.publicKey);

      localStorage.setItem("token", auth.token);

      window.location.href = "/profile";
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  if (isConnected) {
    return (
      <button
        onClick={handleDisconnect}
        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all"
      >
        Disconnect
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={loading}
      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Connecting..." : "Connect Wallet"}
    </button>
  );
};

export default WalletConnectButton;
