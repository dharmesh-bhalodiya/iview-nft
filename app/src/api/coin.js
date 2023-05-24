//require("dotenv").config();

const { Alchemy, Utils, Network } = require("alchemy-sdk");
const { ethers } = require("ethers");

const COIN_CONTRACT_ADDRESS = "0xBD72e07dFE656A824A03DF6579FbA1E96FA10cF0"; //process.env.COIN_ADDRESS;
const COIN_CONTRACT_ABI = require("../abi/iViewCoin.json");

const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
const settings = {
  apiKey: apiKey,
  network: Network.ETH_SEPOLIA
};

const alchemy = new Alchemy(settings);

export const getETHBalance = async (address) => {
  // Get balance and format in terms of ETH
  let balance = await alchemy.core.getBalance(address, "latest");
  balance = Utils.formatEther(balance);
  console.log(`Balance of ${address}: ${balance} ETH`);
  return balance;
};


export const getiViewCoinBalance = async (address) =>{
  const provider = await alchemy.config.getProvider();
  const coinContract = new ethers.Contract(COIN_CONTRACT_ADDRESS, COIN_CONTRACT_ABI.abi, provider);
  let coinBalance = await coinContract.balanceOf(address);
  coinBalance = Utils.formatEther(coinBalance);
  console.log(`Balance of ${address}: ${coinBalance} IVC`);
  return coinBalance;
}

export const getcurrentiViewCoinPrice = async () =>{
  const provider = await alchemy.config.getProvider();
  const coinContract = new ethers.Contract(COIN_CONTRACT_ADDRESS, COIN_CONTRACT_ABI.abi, provider);
  let price = await coinContract.getPrice();
  price = Number(price);
  console.log(`Current price of IVC : ${price} ETH`);
  return price;
}


export const buyiViewCoin = async (address, amount) =>{

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner();
  console.log(signer);
  const coinContract = new ethers.Contract(COIN_CONTRACT_ADDRESS, COIN_CONTRACT_ABI.abi, signer);

  await coinContract.buyCoin(Utils.parseEther(String(amount)),{
      value: Utils.parseEther(String(await getcurrentiViewCoinPrice() * amount))
  }).then(()=>{
      return true;
  }).catch((e)=>{
      throw new Error("transaction failed");
  });
}