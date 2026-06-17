// TODO: connect/disconnect Freighter wallet, expose public key + signing
export function useWallet() {
  return { publicKey: null, connect: async () => {}, disconnect: () => {} };
}
