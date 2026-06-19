import { createContext } from "react";

export const WalletContext =
  createContext(null);

const WalletProvider = ({
  children,
}) => {
  return (
    <WalletContext.Provider value={{}}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;