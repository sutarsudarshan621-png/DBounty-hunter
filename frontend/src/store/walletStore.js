// src/store/walletStore.js

import { create } from "zustand";

const useWalletStore = create((set) => ({
  walletAddress: null,
  isConnected: false,

  connect: (address) =>
    set({
      walletAddress: address,
      isConnected: true,
    }),

  disconnect: () =>
    set({
      walletAddress: null,
      isConnected: false,
    }),
}));

export default useWalletStore;