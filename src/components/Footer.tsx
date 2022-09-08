import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }} m={-1}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="p" sx={{ flexGrow: 1, textAlign: "center" }}>
            Created By <strong>Hannah</strong> Nguyen | © 2022 All rights
            reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
