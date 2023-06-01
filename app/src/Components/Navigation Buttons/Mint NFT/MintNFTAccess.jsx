import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogContentText } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MintNFTAccess({ open, setOpen, setIsButtonDisabled, setPermission }) {
  const history = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const grantPermission = (permission) => {
    // return permission;
    setPermission(permission);
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
              grantPermission(false);
              handleClose();
              handleClick();
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              setIsButtonDisabled(false);
              grantPermission(true);
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
