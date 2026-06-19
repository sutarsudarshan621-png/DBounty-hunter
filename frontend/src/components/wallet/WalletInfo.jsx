import useWallet from "../../hooks/useWallet";

const WalletInfo = () => {
  const { walletAddress, isConnected } = useWallet();

  if (!isConnected) return null;

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="text-sm font-semibold mb-2">
        Connected Wallet
      </h3>

      <p className="text-xs text-slate-400 break-all">
        {walletAddress}
      </p>
    </div>
  );
};

export default WalletInfo;