import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Box, Snackbar, Stack, Typography } from "@mui/material";
import { useState } from "react";
import {
  getcurrentiViewCoinPrice,
  getETHBalance,
  getiViewCoinBalance,
  buyiViewCoin,
} from "../../../api/coin";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

function DialogBox({ open, setOpen }) {
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [coinValue, setCoinValue] = useState(0);
  const [ethBalance, setETHBalance] = useState(0);
  const [iViewCoinBalance, setIViewCoinBalance] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);
  const address = useSelector((state) => state?.walletReducer?.walletAddress);

  const handleClose = () => {
    // await getIViewCoin(walletAddress, amt);
    setOpen(false);
    setLoading(false);
  };

  const getCoinValue = async () => {
    const result = await getcurrentiViewCoinPrice();
    setCoinValue(parseFloat(result).toFixed(1));
    setLoading(false);
  };

  const getBalance = async (walletAddress) => {
    const result = await getETHBalance(walletAddress);
    setETHBalance(result);
    setLoading(false);
  };

  const getIVCoinBalance = async (walletAddress) => {
    const result = await getiViewCoinBalance(walletAddress);
    console.log(result);
    setIViewCoinBalance(result);
  };

  const getIViewCoin = async (walletAddress, amt) => {
    try {
      const result = await buyiViewCoin(walletAddress, amt);
      console.log(result);
      setLoading(false);
      setOpenSnackbar(true);
      setOpen(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setOpenErrorSnackbar(true);
      setOpen(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  useEffect(() => {
    getCoinValue();
    getBalance(address);
    getIVCoinBalance(address);
  }, [address]);

  useEffect(() => {
    const getTotalAmount = (amt) => {
      setTotalAmount(parseFloat(amt * coinValue).toFixed(1));
    };
    getTotalAmount(amount);
  }, [amount, coinValue]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buy iViewCoin</DialogTitle>
        <DialogContent>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              IVC Balance : <b>{iViewCoinBalance} IVC</b>
            </Typography>
            <Typography>
              ETH Balance : <b>{parseFloat(ethBalance).toFixed(1)} ETH</b>
            </Typography>
          </span>
        </DialogContent>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: { xs: "10ch", md: "15ch" },
              },
            }}
            noValidate
            autoComplete="off"
          >
            <Stack direction={"row"}>
              <TextField
                id="standard-number"
                label="Enter Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 0 }}
                variant="standard"
                onChange={(e) =>
                  setAmount(parseFloat(e.target.value).toFixed(1))
                }
                required
                helperText={
                  amount > ethBalance ? "Don't have enough Etherium" : ""
                }
                error={amount > ethBalance}
              />
              <TextField
                id="standard-read-only-input"
                label="Current IVC Value"
                value={coinValue}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="standard-read-only-input"
                label="Total ETH"
                value={totalAmount}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Stack>
          </Box>
        </DialogContent>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async () => {
              setLoading(true);
              await getIViewCoin(address, amount);
            }}
          >
            Buy
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Transaction Successfull !!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              Transaction Cancelled !!
            </Alert>
          </Snackbar>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogBox;
