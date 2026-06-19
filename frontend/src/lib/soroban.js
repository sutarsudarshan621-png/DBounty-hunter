import {
  Server,
} from "stellar-sdk";

const RPC_URL =
  import.meta.env.VITE_SOROBAN_RPC_URL;

export const sorobanServer =
  new Server(RPC_URL);

export const getNetworkPassphrase = () =>
  import.meta.env.VITE_NETWORK_PASSPHRASE;

export const getContractId = () =>
  import.meta.env.VITE_CONTRACT_ID;

export default sorobanServer;