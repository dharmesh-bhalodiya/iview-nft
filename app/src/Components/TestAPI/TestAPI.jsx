import React, { useEffect } from "react";
import { getETHBalance } from "../../api/coin";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Background from "../Background/Background";

function TestAPI() {
  const address = useSelector((state) => state?.walletReducer?.walletAddress);
  const getBalance = async () => {
    const result = await getETHBalance(address);
    console.log(result);
  };
  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Background />
      <Typography textAlign={"center"}>{address}</Typography>
    </div>
  );
}

export default TestAPI;
