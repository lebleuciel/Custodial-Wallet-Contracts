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
{"success":true,"message":"Tokens minted successfully.","receipt":{"_type":"TransactionReceipt","blockHash":"0x132960474b708c18f377bb4f722a00a25275650fb66826a96be8d183252b49ea","blockNumber":8986725,"contractAddress":null,"cumulativeGasUsed":"335999","from":"0x51699578f93C22c19A16fa48F08A71660F3C70B3","gasPrice":"30000000015","blobGasUsed":null,"blobGasPrice":null,"gasUsed":"39536","hash":"0x6b4e8a8f6b471d5bff9db3c57191c0a2e45ee092e880610abdcc0cddc80904f7","index":1,"logs":[{"_type":"log","address":"0x467a67f8e7D6f2296ed7E94540f6Cca856eA27B3","blockHash":"0x132960474b708c18f377bb4f722a00a25275650fb66826a96be8d183252b49ea","blockNumber":8986725,"data":"0x0000000000000000000000000000000000000000000000c0a9a86a19da480000","index":4,"topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x00000000000000000000000051699578f93c22c19a16fa48f08a71660f3c70b3"],"transactionHash":"0x6b4e8a8f6b471d5bff9db3c57191c0a2e45ee092e880610abdcc0cddc80904f7","transactionIndex":1},{"_type":"log","address":"0x0000000000000000000000000000000000001010","blockHash":"0x132960474b708c18f377bb4f722a00a25275650fb66826a96be8d183252b49ea","blockNumber":8986725,"data":"0x000000000000000000000000000000000000000000000000000436bbc51340000000000000000000000000000000000000000000000000000072289d745f24df00000000000000000000000000000000000000000000023fd9ef44070eb2b8ef000000000000000000000000000000000000000000000000006df1e1af4be4df00000000000000000000000000000000000000000000023fd9f37ac2d3c5f8ef","index":5,"topics":["0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63","0x0000000000000000000000000000000000000000000000000000000000001010","0x00000000000000000000000051699578f93c22c19a16fa48f08a71660f3c70b3","0x000000000000000000000000915a2284d28bd93de7d6f31173b981204bb666e6"],"transactionHash":"0x6b4e8a8f6b471d5bff9db3c57191c0a2e45ee092e880610abdcc0cddc80904f7","transactionIndex":1}],"logsBloom":"0x00000000000000000010000000000000000000000000000000000000000000000000800000000000000000000000000000008000000000000000000000000000000000000000000000000008000000800000000000000000000100000000000000000000020000000000000000000800000000001000000080000010000000000000000000000000000000000002000000000000000000000000000000000000200000000000000000040000000000000000000000000000000000000000004000000002000000000001000000000000000002000000000000100000000020000002000000000000000000000000000000000000400040000000000000100000","status":1,"to":"0x467a67f8e7D6f2296ed7E94540f6Cca856eA27B3"}}%                                                        
hast@Bs-MacBook-Air custodial-wallet % 