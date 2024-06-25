import { ethers } from "hardhat";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const contractName = "TatumErc20";
  const contractFactory = await ethers.getContractFactory(contractName);

  const name = process.env.ERC20_NAME || "Default ERC20 Name";
  const symbol = process.env.ERC20_SYMBOL || "ERC20";
  const decimals = parseInt(process.env.ERC20_DECIMALS || "18", 10);
  const initialSupply = ethers.parseUnits(process.env.ERC20_INITIAL_SUPPLY || "1000000", decimals);
  const initialOwner = process.env.ADMIN_ADDRESS || "0x51699578f93c22c19a16fa48f08a71660f3c70b3";
  const admin = process.env.ADMIN_ADDRESS || "0x51699578f93c22c19a16fa48f08a71660f3c70b3";
  const minter = process.env.MINTER_ADDRESS || admin;
  const pauser = process.env.PAUSER_ADDRESS || admin;

  const contract = await contractFactory.deploy(name, symbol, decimals, initialSupply, initialOwner, admin, minter, pauser);

  // Wait for the deployment to be mined
  await contract.waitForDeployment();

  console.log(`TatumErc20 deployed to: ${contract.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
