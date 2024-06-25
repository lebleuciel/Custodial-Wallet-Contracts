# Custodial Wallet Contracts
# Running the Project

To get the Custodial Contract up and running, follow these steps carefully:

Execute the following command to run the scripts:

```bash
npx ts-node main.ts
```
or 

```bash
npx nodemon main.ts
```

### Deploying the Contract
Navigate to the Client Directory: Open your terminal and change the directory to where your client-side code resides, typically named Client or similar.


Compile the Contracts:

```bash
npx hardhat compile       
```

Deploy the Contract:
 Execute the following command to deploy your betting smart contract onto the Polygon network:

```bash
px hardhat run scripts/deployerc721.ts --network amoy --show-stack-tracespx hardhat run scripts/deployerc1155.ts --network amoy 
--show-stack-traces
px hardhat run scripts/deployerc20.ts --network amoy --show-stack-traces
```

This step compiles your Solidity contracts, migrates them to the specified network (Polygon, in this case), and deploys them to the blockchain.


curl -X POST http://localhost:6000/createBatch \
     -H "Content-Type: application/json" \
     -d '{
           "owner": "0x51699578f93C22c19A16fa48F08A71660F3C70B3",
           "indices": [1, 2, 3, 4, 5]
         }'

curl -G http://localhost:6000/getWallets \
     --data-urlencode "owner=0x51699578f93C22c19A16fa48F08A71660F3C70B3" \
     --data-urlencode "indices=1,2,3,4,5"

curl -X POST http://localhost:6000/create \
     -H "Content-Type: application/json" \
     -d '{
           "owner": "0x51699578f93C22c19A16fa48F08A71660F3C70B3",
           "index": 11
         }'
curl -G http://localhost:6000/getWallet \
     --data-urlencode "owner=0x51699578f93C22c19A16fa48F08A71660F3C70B3" \
     --data-urlencode "index=11"
