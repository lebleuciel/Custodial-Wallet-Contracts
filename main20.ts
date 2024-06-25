import router from "./routererc20";

const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
require('dotenv').config();
const { ethers } = require("ethers");
var { abi } = require('./artifacts/contracts/Erc20.sol/TatumErc20.json');

const app = express();
app.use(bodyParser.json());
app.use(router); 

// Setup the provider and wallet using environment variables.
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Initialize the contract instance for interaction.
const contractAddress = process.env.CONTRACT_ADDRESS20;
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Function to check and log the wallet's balance
async function checkBalance() {
    const balance = await provider.getBalance(wallet.address);
    console.log(`Balance of ${wallet.address}: ${ethers.formatEther(balance)} ETH`);
}

const port = 6000; 
app.listen(port, async () => {
    console.log(`Backend script for ERC20 is running on port ${port}...`);
    console.log("Current balance of the Wallet is:");
    await checkBalance();
});
