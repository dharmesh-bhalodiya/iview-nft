import React, { useEffect } from "react";
import { getETHBalance, getiViewCoinBalance, getcurrentiViewCoinPrice, buyiViewCoin } from "../../api/coin";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Background from "../Background/Background";

function TestAPI() {
  const address = useSelector((state) => state?.walletReducer?.walletAddress);
  const getBalance = async () => {
    const result = await getETHBalance(address);
    console.log(result);
  };
  const getCoinBalance = async () => {
    const result = await getiViewCoinBalance(address);
    console.log(result);
  };
  const getCurrentCoinPrice = async () => {
    const result = await getcurrentiViewCoinPrice(address);
    console.log(result);
  };
  const buyCoin = async () => {
    const result = await buyiViewCoin(address, 1).catch((e)=>{console.log(e.message)});
    console.log(result);
  };
  useEffect(() => {
    getBalance();
    getCoinBalance();
    getCurrentCoinPrice();
    //buyCoin();
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Background />
      <Typography textAlign={"center"}>{address}</Typography>
    </div>
  );
}

export default TestAPI;
