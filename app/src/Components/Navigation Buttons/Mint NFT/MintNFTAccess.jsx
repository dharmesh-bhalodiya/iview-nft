import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogContentText } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MintNFTAccess({ open, setOpen, setIsButtonDisabled }) {
  const history = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    history("/Explore/MyNFT");
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Permission Required"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to Mint your NFT?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsButtonDisabled(true);
              handleClose();
              handleClick();
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              setIsButtonDisabled(false);
              handleClose();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MintNFTAccess;
