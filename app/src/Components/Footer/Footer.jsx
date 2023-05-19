import React from "react";
import { Typography } from "@mui/material";

function Footer() {
  return (
    <Typography
      variant="h6"
      sx={{
        marginTop: "7rem",
        textAlign: "center",
        marginBottom: "1rem",
        // color: "white",
      }}
    >
      <hr style={{ borderColor: "#757677", marginBottom: "1rem" }} />
      (c) Copyrights 2023 by iView Labs Pvt. Ltd. All rights reserved
    </Typography>
  );
}

export default Footer;
