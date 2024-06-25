const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
require('dotenv').config();
const { ethers } = require("hardhat");
var { abi } = require('./artifacts/contracts/Erc1155.sol/TatumErc1155.json');
const router = express.Router();

// Setup the provider and wallet using environment variables.
var provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
var privateKey = process.env.PRIVATE_KEY;
var wallet = new ethers.Wallet(privateKey, provider);
const signer = new ethers.Wallet(privateKey, provider);

// Initialize the contract instance for interaction.
const contractAddress = process.env.CONTRACT_ADDRESS1155;
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Endpoint to mint a single token
router.post('/mint', async (req: any, res: any) => {
    try {
        const { to, id, amount, uri } = req.body;
        const tx = await contract.mint(to, id, amount, uri, new Uint8Array());
        const receipt = await tx.wait();
        res.json({
            success: true,
            message: 'Token minted successfully.',
            receipt,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to mint token',
            error: (error as any).message
        });
    }
});


// Endpoint to mint multiple tokens
router.post('/mintBatch', async (req: any, res: any) => {
    try {
        const { to, ids, amounts, uris } = req.body;
        const tx = await contract.mintBatch(to, ids, amounts, uris, []);
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

// Endpoint to burn a token
router.post('/burn', async (req: any, res: any) => {
    try {
        const { owner, id, amount } = req.body;
        const tx = await contract.burn(owner, id, amount);
        const receipt = await tx.wait();
        res.json({
            success: true,
            message: 'Token burned successfully.',
            receipt,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to burn token',
            error: (error as any).message
        });
    }
});

// Endpoint to get the token URI
router.get('/uri', async (req: any, res: any) => {
    try {
        const { id } = req.query;
        const uri = await contract.uri(id);
        res.json({
            success: true,
            uri
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get token URI',
            error: (error as any).message
        });
    }
});

export default router;
