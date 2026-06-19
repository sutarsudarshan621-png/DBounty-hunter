import {
  Horizon,
} from "stellar-sdk";

export const server =
  new Horizon.Server(
    "https://horizon-testnet.stellar.org"
  );

export const networkPassphrase =
  "Test SDF Network ; September 2015";

export default server;