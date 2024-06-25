const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
require('dotenv').config();
const { ethers } = require("hardhat");
var { abi } = require('./artifacts/contracts/Erc20.sol/TatumErc20.json');
const router = express.Router();

// Setup the provider and wallet using environment variables.
var provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
var privateKey = process.env.PRIVATE_KEY;
var wallet = new ethers.Wallet(privateKey, provider);
const signer = new ethers.Wallet(privateKey, provider);

// Initialize the contract instance for interaction.
const contractAddress = process.env.CONTRACT_ADDRESS20;
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Endpoint to mint tokens
router.post('/mint', async (req: any, res: any) => {
    try {
        const { to, amount } = req.body;
        const tx = await contract.mint(to, ethers.parseUnits(amount, await contract.decimals()));
        const receipt = await tx.wait();
        res.json({
            success: true,
            message: 'Tokens minted successfully.',
            receipt,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to mint tokens',
            error: (error as any).message
        });
    }
});

// Endpoint to pause the contract
router.post('/pause', async (req: any, res: any) => {
    try {
        const tx = await contract.pause();
        const receipt = await tx.wait();
        res.json({
            success: true,
            message: 'Contract paused successfully.',
            receipt,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to pause contract',
            error: (error as any).message
        });
    }
});

// Endpoint to unpause the contract
router.post('/unpause', async (req: any, res: any) => {
    try {
        const tx = await contract.unpause();
        const receipt = await tx.wait();
        res.json({
            success: true,
            message: 'Contract unpaused successfully.',
            receipt,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to unpause contract',
            error: (error as any).message
        });
    }
});

// Endpoint to get token balance
router.get('/balanceOf', async (req: any, res: any) => {
    try {
        const { address } = req.query;
        const balance = await contract.balanceOf(address);
        res.json({
            success: true,
            balance: ethers.formatUnits(balance, await contract.decimals())
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get balance',
            error: (error as any).message
        });
    }
});

export default router;
