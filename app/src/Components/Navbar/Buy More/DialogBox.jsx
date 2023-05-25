import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { useState } from "react";
import { getIVCoinValue, getTotalETHCoin } from "../../../api/buycoin";

function DialogBox({ open, setOpen }) {
  const [totalAmount, setTotalAmount] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const oneIVCoinValue = getIVCoinValue();

  const totalETH = getTotalETHCoin(totalAmount);

  const getCoins = () => {
    console.log("Total ETH : ", totalETH);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buy iViewCoin</DialogTitle>
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
            <div>
              <TextField
                id="standard-number"
                label="Enter Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={(e) =>
                  setTotalAmount(e.target.value * oneIVCoinValue)
                }
              />
              <TextField
                id="standard-read-only-input"
                label="Current IVC Value"
                value={oneIVCoinValue}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="standard-read-only-input"
                label="Total ETH"
                value={totalETH}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              getCoins();
            }}
          >
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogBox;
