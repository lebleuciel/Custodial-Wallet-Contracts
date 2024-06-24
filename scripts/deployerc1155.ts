import { ethers } from "hardhat";
import dotenv from 'dotenv';
import { ContractFactory } from "ethers";

dotenv.config();

async function main() {
  const contractName = "TatumErc1155";
  const contractFactory = await ethers.getContractFactory(contractName);

  const admin = process.env.ADMIN_ADDRESS || "0x0000000000000000000000000000000000000000";
  const minter = process.env.MINTER_ADDRESS || admin;
  const baseUri = process.env.BASE_URI || "https://example.com/metadata/";

  const contract = await contractFactory.deploy(admin, minter, baseUri);

  // Wait for the deployment to be mined
  await contract.waitForDeployment();

  console.log(`TatumErc1155 deployed to: ${contract.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
