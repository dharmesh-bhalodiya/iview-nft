import React, { useEffect } from "react";
import { getETHBalance } from "../../api/coin";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Background from "../Background/Background";

function TestAPI() {
  const getBalance = async () => {
    const result = await getETHBalance();
    console.log(result);
  };
  useEffect(() => {
    getBalance();
  }, []);

  const address = useSelector((state) => state?.walletReducer?.walletAddress);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Background />
      <Typography textAlign={"center"}>{address}</Typography>
    </div>
  );
}

export default TestAPI;
