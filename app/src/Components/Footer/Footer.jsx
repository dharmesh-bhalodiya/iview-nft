import React from "react";
import { Typography } from "@mui/material";

function Footer() {
  return (
    <Typography
      variant="h6"
      sx={{
        marginTop: "5rem",
        textAlign: "center",
        // color: "white",
      }}
    >
      (c) Copyrights 2023 by iView Labs Pvt. Ltd. All rights reserved
    </Typography>
  );
}

export default Footer;
