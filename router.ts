const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
require('dotenv').config();
const { ethers } = require("hardhat");
var { abi } = require('./artifacts/contracts/Erc721.sol/TatumErc721.json');
const router = express.Router();

// Setup the provider and wallet using environment variables.
var provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
var privateKey = process.env.PRIVATE_KEY;
var wallet = new ethers.Wallet(privateKey, provider);
const signer = new ethers.Wallet(privateKey, provider);

// Initialize the contract instance for interaction.
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Endpoint to mint a single token with a URI
router.post('/mintWithTokenURI', async (req: any, res: any) => {
    try {
        const { to, tokenId, uri } = req.body;
        const tx = await contract.mintWithTokenURI(to, tokenId, uri);
        const receipt = await tx.wait();
        res.json({ 
            success: true, 
            message: 'Token minted successfullyyy.',receipt  ,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to mint token', 
            error: (error as any).message 
        });
    }
});


// Endpoint to mint multiple tokens with URIs
router.post('/mintMultiple', async (req:any, res:any) => {
    try {
        const { to, tokenIds, uris } = req.body;
        const tx = await contract.mintMultiple(to, tokenIds, uris);
        await tx.wait();
        res.json({ success: true, message: 'Tokens minted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to mint tokens',error: (error as any).message });
    }
    }
);

// Endpoint to burn a token
router.post('/burn', async (req:any, res:any) => {
    try {
        const { tokenId } = req.body;
        const tx = await contract.burn(tokenId);
        await tx.wait();
        res.json({ success: true, message: 'Token burned successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to burn token',error: (error as any).message });
    }
    }
);

// Endpoint to get the token URI
router.get('/tokenURI', async (req:any, res:any) => {
    try {
        const { tokenId } = req.query;
        const uri = await contract.tokenURI(tokenId);
        res.json({ success: true, uri });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get token URI',error: (error as any).message });
    }
    }
);

// Endpoint to check if a contract supports an interface
router.get('/supportsInterface', async (req:any, res:any) => {
    try {
        const { interfaceId } = req.query;
        const supported = await contract.supportsInterface(interfaceId);
        res.json({ success: true, supported });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to check interface support',error: (error as any).message });
    }
    }
);

export default router;
