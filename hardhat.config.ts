import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
    ],
  },  networks: {
    amoy: {
      url: process.env.RPC_URL,
      accounts: ["0x1f85c6648c61bc2c4e365384289cac06a66a777675b0c502ee6124306f9f4163"]
    },
  },
};

export default config;
