// import { ethers } from "hardhat";

// async function main() {
  
//   const CustodialContract = await ethers.deployContract("ERC721");

//   await CustodialContract.waitForDeployment();

//   console.log(
//     `CustodialContract deployed to ${CustodialContract.target}`
//   );
//   return CustodialContract.target
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// export default main;
import { ethers } from "hardhat";
import { ContractFactory } from "ethers";

async function main() {
  // Compile the contract first if you haven't done so
  const contractName = "TatumErc721";
  const contractFactory = await ethers.getContractFactory(contractName);

  // Deploy the contract
  const contract = await contractFactory.deploy(
    "Your ERC721 Name",
    "Your ERC721 Symbol",
    "Your Base URI",
    "Your Admin Address",
    "Your Minter Address"
  );

  // Wait for the deployment to be mined
  await contract.deployed();

  console.log(
    `Contract deployed to: ${contract.address}`
  );

  return contract.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
