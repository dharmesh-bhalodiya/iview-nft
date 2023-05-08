# iview-nft
NFT market place to mint/buy/sell NFTs with custom cryptocurrency


## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract


## Getting started with Hardhat
`npm init -y`
`npm install hardhat`
`npx hardhat`


## Setup Backend
Install dependencies in the top-level directory with `npm install`.

1. Start Local Node of Hardhat `npx hardhat node`
2. Create `.env` file from example file
3. Copy private key from console of local node or use from Testnet
4. Run deployment script `npx hardhat run ./scripts/deploy.js`



## Setup Frontend
`cd` into the `/app` directory and run `npm install`.

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000] to view it in your browser.