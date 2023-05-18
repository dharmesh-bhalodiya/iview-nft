
require('dotenv').config();
const { Alchemy, Utils } = require('alchemy-sdk');

const apiKey = process.env.ALCHEMY_API_KEY;
const settings = {
    apiKey: apiKey
};

const alchemy = new Alchemy(settings);

export const getETHBalance = async(address) => {
    // Get balance and format in terms of ETH
    let balance = await alchemy.core.getBalance(address, 'latest');
    balance = Utils.formatEther(balance);
    console.log(`Balance of ${address}: ${balance} ETH`);
}