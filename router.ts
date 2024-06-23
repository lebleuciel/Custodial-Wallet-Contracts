const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
require('dotenv').config();
const { ethers } = require("hardhat");
var { abi } = require('./artifacts/contracts/CustodialWalletFactoryV2.sol/CustodialWalletFactoryV2.json');
const router = express.Router();
const IERC20_ABI =  []

// Setup the provider and wallet using environment variables.
var provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
var privateKey = process.env.PRIVATE_KEY;
var wallet = new ethers.Wallet(privateKey, provider);
const signer = new ethers.Wallet(privateKey, provider);

// Initialize the contract instance for interaction.
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, abi, wallet);
router.post('/create', async (req:any, res:any)  => {
    try {
        const { owner, index } = req.body;
        const tx = await contract.create(owner, index);
        await tx.wait();
        res.json({ success: true, message: 'Custodial wallet created successfully.' });
    } catch (error:any) {
        res.status(500).json({ success: false, message: 'Failed to create custodial wallet', error: error.message });
    }
});

// Endpoint to get a single wallet
router.get('/getWallet', async (req:any, res:any)  => {
    try {
        const { owner, index } = req.query;
        const [addr, exists, salt] = await contract.getWallet(owner, index);
        res.json({ success: true, addr, exists, salt });
    } catch (error:any) {
        res.status(500).json({ success: false, message: 'Failed to retrieve wallet', error: error.message });
    }
});

// Endpoint to get multiple wallets
router.get('/getWallets', async (req:any, res:any)  => {
    try {
        const { owner, indices } = req.query;
        const indicesArray = indices.split(',').map((i:any) => parseInt(i));
        const [addresses, exists, salts] = await contract.getWallets(owner, indicesArray);
        res.json({ success: true, addresses, exists, salts });
    } catch (error:any) {
        res.status(500).json({ success: false, message: 'Failed to retrieve wallets', error: error.message });
    }
});
// Endpoint to create multiple custodial wallets
router.post('/createBatch', async (req:any, res:any)  => {
    try {
        const { owner, indices } = req.body;
        const tx = await contract.createBatch(owner, indices);
        await tx.wait();
        res.json({ success: true, message: 'Custodial wallets created successfully.' });
    } catch (error:any) {
        res.status(500).json({ success: false, message: 'Failed to create custodial wallets', error: error.message });
    }
});
export default router;
